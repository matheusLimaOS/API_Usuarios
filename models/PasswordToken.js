let knex = require("../database/connection");
let User = require("./User");
const { v4: uuidv4 } = require('uuid');

class PasswordToken{

    async create(email){
        let usuario;
        let token;
        try{
            usuario = await User.findByEmail(email);

            if(!usuario){
                return {status: false, statuscode:404,err:"Usuário não encontrado"};
            }

            token = uuidv4();

            await knex.insert({
                user_id: usuario.id,
                used: 0,
                token: token
            }).table("password_tokens")

            return {status: true, statuscode:200, token: token}
        }
        catch (err){
            console.log(err);
            return {status: false, statuscode:500, err:"Erro interno de sistema"};
        }
    }
    async validate(token,id){
        let result;
        try{
            result = await knex.select().where({token: token,user_id:id}).table("password_tokens");

            if(result.length === 0){
                return {status: false, statusCode:404 ,message:"Token não encontrado!"};
            }

            if(result[0].used){
                return {status: false,statusCode:406 ,message:"Token já utilizado!"};
            }

            return {status:true, token: result[0]};
        }
        catch (err){
            console.log(err);
            return {status: false, statusCode:500 ,message:"Erro ao validar token"};
        }
    }
    async setTokenUsed(token){
        try{
            await knex.table("password_tokens").where({id:token.id}).update({used:1});
            return {status:true}
        }
        catch (err){
            console.log(err);
            return {status:false, statusCode:500,message:"Erro ao definir status usado no token"}
        }
    }
}

module.exports = new PasswordToken;