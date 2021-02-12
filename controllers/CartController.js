const usuario = require("../controllers/UserController");
let Cart = require("../models/Cart");
let Product = require("../models/Product")

class CartController{
    async addProductCart(req,res){
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
        }


        let novo = await Cart.findByProductID(product.id);

        if(!novo.status){
            await Cart.addToCart(product.id,product.descricao,product.tamanho,quantidade1,valor1,"matholaslima4472@gmail.com");
            res.status(200);
            res.json({message:"Produto Criado com sucesso"});
        }

        let update = await Cart.updateCartByProduct(product.id,novo.quantidade + quantidade1);

        if(!update){
            res.status(500);
            res.json({message:"ERRO INTERNO DO SISTEMA"});
        }

        res.status(200);
        res.json({message:"Produto Atualizado com sucesso"});
    }
    async ListProductsCart(req,res){
        let {usuario} = req.params;

        let resultado = await Cart.findByUser(usuario);

        res.status(200);
        res.json(resultado);
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

module.exports = new CartController();
