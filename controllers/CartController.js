let Cart = require("../models/Cart");
let Product = require("../models/Product")
let User = require("../models/User")
let Sell = require("../models/Sells")

class CartController{
    async addProductCart(req,res){
        let {id} = req.params;
        let {descricao,quantidade,valor,tamanho} = req.body;
        let quantidade1,valor1,product;
        try {
            product = await Product.findByDescAndSize(descricao,tamanho);
        }
        catch (err){
            console.log(err);
        }
        valor1 = await Valor(valor);
        quantidade1 = await Quantidade(quantidade);
        let valida = await Valida(quantidade1,product.quantidade,valor1);

        if(!valida){
            res.status(Valida.status);
            res.json(Valida.message);
            return;
        }

        console.log();

        let email = await User.findById(id);


        let novo = await Cart.findByProductID(product.id);

        if(!novo.status){
            await Cart.addToCart(product.id,product.descricao,product.tamanho,quantidade1,valor1,email.email);
            res.status(200);
            res.json({message:"Produto Criado com sucesso"});
            return;
        }

        let update = await Cart.updateCartByProduct(novo.id_carrinho,novo.quantidade + quantidade1);

        if(!update.status){
            res.status(500);
            res.json({message:"ERRO INTERNO DO SISTEMA"});
            return;
        }

        res.status(200);
        res.json({message:"Produto Atualizado com sucesso"});
    }
    async ListProductsCart(req,res){
        let {usuario} = req.params;

        let user = await User.findById(usuario);

        let resultado = await Cart.findByUser(user.email);

        res.status(200);
        res.json(resultado);
    }
    async clearCart(req,res){
        let {usuario} = req.params;

        let user = await User.findById(usuario);

        let deleteCart = await Cart.deleteCart(user.email);

        res.status(deleteCart.statusCode);
        res.json({message:deleteCart.message});
    }
    async finishCart(req,res){
        let {usuario} = req.params;
        let user = await User.findById(usuario);

        let resultado = await Cart.findByUser(user.email);

        if(resultado.length===0){
            res.status(404);
            res.json({message:"Carrinho Vazio!"});
            return;
        }

        let verifica = await Verificacao(resultado);

        if(!verifica.status){
            res.status(verifica.statusCode);
            res.json({message:verifica.message});
            return;
        }

        let venda = await Sell.insertVenda(verifica.quantidade,verifica.valortotal,usuario);

        if(!venda.status){
            res.status(venda.statusCode);
            res.json({message:venda.message});
            return;
        }

        let insertVI = await insertVendasItens(resultado,venda.id);

        if(!insertVI.status){
            res.status(insertVI.statusCode);
            res.json({message:insertVI.message});
        }

        await Cart.deleteCart(user.email);

        res.status(200);
        res.json("Carrinho vendido com sucesso");
    }
    async addQuantProdCart(req,res){
        let {id} = req.params;
        let {quantidade} = req.body;

        await Cart.updateCartByProduct(id,quantidade);

        res.status(200);
        res.json("DEU CERTO");
    }
    async removeCart(req,res){
        let {id} = req.params;

        let remove = await Cart.removeCart(id);

        res.status(remove.statusCode);
        res.json({"message":remove.message});
    }
}

async function Valida(quantidade,quantidade2,valor){
    if(quantidade<0 || isNaN(quantidade)===true){
        return {status:406,message:"Campo quantidade está inválido!"};
    }
    if(valor<0 || isNaN(valor)===true){
        return {status:406,message:"Campo valor está inválido!"};
    }
    if(quantidade>quantidade2){
        return {status:406,message:"Quantidade informada, maior que a atual!"};
    }
    return true;
}
async function Valor(valor){

    let valor1,valor2;

    valor1 = valor.split(" ");

    if(valor1[1].indexOf(',')>0){
        valor2=valor1[1].split(",");
        valor1=valor2[0] + '.' + valor2[1];
        valor1=parseFloat(valor1);
    }
    else{
        valor1=parseFloat(valor1[1]);
    }

    return valor1;
}
async function Quantidade(quantidade){
    try {
        let quantidade1 = quantidade.split(".");
        quantidade1 = quantidade1[0] + quantidade1[1];
        quantidade1 = parseInt(quantidade1);

        return quantidade1;
    }
    catch (err){
        return quantidade
    }

}
async function Verificacao(produtos){
    let quantidade=0, valortotal=0;
    for (let i=0;i<produtos.length;i++){
        let produto = await Product.findByID(produtos[i].ID_produto);

        quantidade = quantidade + produtos[i].quantprod;
        valortotal = valortotal + (produtos[i].quantprod * produtos[i].valorprod);

        if(produto[0].quantidade < produtos[i].quantprod){
            return {
                status:false,
                statusCode:406,
                message:`O produto (${produtos[i].descricao}): Quantidade vendida maior que a disponivel em estoque!`
            }
        }
    }

    return {status:true,quantidade: quantidade,valortotal:valortotal};
}
async function insertVendasItens(produtos,id_venda){
    for (let i=0;i<produtos.length;i++){
        let insert = await Sell.insertVendaItem(produtos[i],id_venda);

        let produto = await Product.findByID(produtos[i].ID_produto);
        await Product.removeQuantById(produtos[i].ID_produto,produto[0].quantidade - produtos[i].quantprod);

        if(!insert.status){
            return insert
        }
    }

    return {status:true};
}

module.exports = new CartController();
