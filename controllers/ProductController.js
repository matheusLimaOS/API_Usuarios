let Product = require("../models/Product");

class ProductController{
    async allProducts(req,res){
       let all = await Product.index();

        if(all===false){
            res.status(500);
            res.json({"message":"Erro no sistema"});
        }

        res.status(200);
        res.json(all);

    }
    async newProduct(req, res){
        let {descricao,quantidade,tamanho,valor} = req.body;
        let valor1,quantidade1;

        quantidade1 = await Quantidade(quantidade);
        valor1 = await Valor(valor);

        let validado = await Valida(descricao,quantidade1,tamanho,valor1);

        if(validado.status){
            res.status(validado.status);
            res.json({"message":validado.message});
            return;
        }

        let create = await Product.new(descricao,tamanho,quantidade1,valor1);

        if(create.status){
            res.status(create.status);
            res.json({"message":create.message});
            return;
        }

        res.status(200);
        res.json({"ID":create.id,"Descricao":descricao});
    }
    async updateProduct(req,res){
        let {descricao,quantidade,tamanho,valor} = req.body;
        let produ = await Product.findByDescAndSize(descricao,tamanho);
        let valor1,quantidade1;

        quantidade1 = await Quantidade(quantidade);
        valor1 = await Valor(valor);

        let validado = await Validaedit(quantidade1,produ.quantidade,valor1);

        if(validado.status){
            res.status(validado.status);
            res.json({"message":validado.message});
            return;
        }

        await Product.updateQuantValor(quantidade1,valor1,produ.id);

        res.status(200);
        res.json({"ID":produ.id,"Descricao":descricao});
    }
    async findProduct(req,res){
        let id = req.params.id;

        let product = await Product.findByID(id);

        if(product.status){
            res.status(product.status);
            res.json({"message":product.message});
            return;
        }

        res.status(200);
        res.json(product);
    }
    async removeProduct(req,res){
        let {descricao,quantidade,valor,tamanho} = req.body;

        let produ = await Product.findByDescAndSize(descricao,tamanho);

        if(produ.quantidade < quantidade){
            res.status(406);
            res.json({"message": "Quantidade informada, maior que a disponivel em estoque!"});
            return;
        }
        await Product.removeQuantById(produ.id,produ.quantidade-quantidade);

        res.status(200);
        res.json({"message":"Produto removido com sucesso!"});

    }
}

async function Valida(descricao,quantidade,tamanho,valor){
    // if (descricao.length === 0 || descricao.split(" ")[0]===""){
    //     return {status:406,message:"Campo descrição está inválido!"};
    // }
    if(quantidade<0 || isNaN(quantidade)===true){
        return {status:406,message:"Campo quantidade está inválido!"};
    }
    if(tamanho<0 || isNaN(tamanho)===true){
        return {status:406,message:"Campo tamanho está inválido!"};
    }
    if(valor<0 || isNaN(valor)===true){
        return {status:406,message:"Campo valor está inválido!"};
    }

    return true;
}
async function Validaedit(quantidade,quantidade2,valor){
    if(quantidade<quantidade2){
        return {status:406,message:"Quantidade informada, menor que a atual!"};
    }
    if(valor===0 || isNaN(valor)===true){
        return {status:406,message:"Campo valor está inválido!"};
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
    let quantidade1 = quantidade.split(".");
    quantidade1 = quantidade1[0] + quantidade1[1];
    quantidade1 = parseInt(quantidade1);

    return quantidade1;
}

module.exports = new ProductController();
