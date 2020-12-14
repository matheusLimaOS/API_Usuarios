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

        let create = await Product.new(descricao,tamanho,quantidade,valor);

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

module.exports = new ProductController();