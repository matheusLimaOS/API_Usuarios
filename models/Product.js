let knex = require("../database/connection");

class Product{
    async index(){
        try{
            return await knex.select("*").table("produtos");
        }
        catch (err){
            console.log(err);
            return false;
        }
    }
    async new(descricao,tamanho,quantidade,valor){
        let teste = await this.findByDescAndSize(descricao,tamanho);

        if(!teste){
            try {
                let id = await knex.insert({descricao,tamanho,quantidade,valor}).table("produtos");
                return {id:id[0]}
            }
            catch (error) {
                console.log(error);
                return {"status":500,"message":"Erro no sistema!"}
            }
        }
        else{
            return {"status":406,"message":"Produto já cadastrado!"}
        }


    }
    async updateQuantValor(quantidade,valor,ID){
        await knex.update({quantidade,valor})
            .where({ID})
            .table("produtos");

        return true;
    }
    async findByID(id){
        try {
            let idc = await knex.select("*").where({id:id}).table("produtos");
            if(!idc[0]){
                return {"status":404,"message":"Usuário não encontrado!"}
            }
            return idc;
        }
        catch (err){
            console.log(err);
            return {"status":500,"message":"Erro no sistema!"};
        }

    }
    async findByDescAndSize(descricao,tamanho){
        let search = await knex.select("*")
            .where('descricao','like',descricao)
            .andWhere({tamanho})
            .table("produtos");

        return search[0];
    }
    async removeQuantById(id,quant){
       await knex.update({quantidade:quant}).where({ID:id}).table("produtos");
    }

}

module.exports = new Product();
