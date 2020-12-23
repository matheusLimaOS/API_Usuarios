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

        let valor1 = valor.split(" ");
        valor1 = valor1[1].split(".");
        let valor2= valor1[1].split(",");
        valor1 = parseInt(valor1[0] + valor2[0] + valor2[1]);
        let quantidade1 = quantidade.split(".");
        quantidade1 = quantidade1[0] + quantidade1[1];
        quantidade1 = parseInt(quantidade1);


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
}

async function Valida(descricao,quantidade,tamanho,valor){
    console.log(":" + descricao + ":");
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

module.exports = new ProductController();
