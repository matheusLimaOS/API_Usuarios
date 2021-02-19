let knex = require("../database/connection");
let bcrypt = require("bcrypt");

class User{

    async new(email,password,name){
        try {
            let hash = await bcrypt.hash(password,10);
            let id = await knex.insert({email,password: hash,name,role: 0}).table("users");
            return {id:id[0],email:email,name:name}
        }
        catch (error){
            console.log(error);
            return false;
        }

    }

    async findPassword(id){
        try {
            let result = await knex.select(["password"]).from("users").where({id:id});
            if(result[0])
                return result[0].password;
            else
                return false;
        }
        catch (error){
            return false;
        }
    }

    async findEmail(email){
        try {
            let result = await knex.select(["id","name","email","role"]).from("users").where({email:email});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            return false;
        }
    }

    async findAll(){
        try {
            return await knex.select(["id","name","email","role"]).from("users");
        }
        catch (error){
            console.log(error);
            return [];
        }
    }

    async findById(id){
        try {
            let result = await knex.select(["id","name","email","role"]).from("users").where({id:id});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }

    async findByEmail(email){
        try {
            let result = await knex.select(["id","email","name","role"]).from("users").where({email:email});
            if(result[0])
                return result[0];
            else
                return false;
        }
        catch (error){
            console.log(error);
            return false;
        }
    }

    async update(id,email,name,role){
        try {
            await knex.table("users").where({id:id}).update({name: name,email:email,role:role});
            return {status: true, message: "Usuario alterado com sucesso"}
        }
        catch(error){
            return {status: false, err: "ERRO INTERNO DE SISTEMA"}
        }
    }

    async delete(id){
        let valida = await this.findById(id);

        if(!valida){
            return {status: false, err: "Usuário não encontrado", statuscode: 404}
        }

        try {
            await knex("users")
                .where({id:id})
                .delete()

            return {status:true, err: "Deletado com Sucesso", user:valida,statuscode: 200};
        }
        catch(err){
            return {status:false, err: "ERRO INTERNO DO SISTEMA",statuscode: 500}
        }

    }

    async redefinepassword(newpassword,id){
        let npassword = await bcrypt.hash(newpassword,10);

        try {
            await knex.table("users").where({id:id}).update({password:npassword});
            return {status:true};
        }
        catch (err){
            console.log(err);
            return {status:false,statusCode: 500 ,message:"Erro ao alterar senha"};
        }
    }
}

module.exports = new User();
