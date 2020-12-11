let User = require("../models/User");
let PasswordToken = require("../models/PasswordToken");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let secret = "ibwegbababjanopbapounb";

class UserController{

    async index(req,res){
        try{
            res.status(200);
            res.json(await User.findAll());
        }
        catch(error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    //Possui nenhum Pârametro
    //Não possui Body
    //Retorna um array, contendo todos os usuários

    async findUser(req,res){
        let id = req.params.id;
        try{
            let user = await User.findById(id);
            if(user === false){
                res.status(404);
                res.json({message: "Usuário não encontrado!"});
                return
            }
            res.status(200);
            res.json({user:user});
        }
        catch (error){
            res.status(500);
            res.json({message:"Erro interno do sistema!"});
        }

    }
    //Possui 1 Pârametro (ID)
    //Não possui Body
    //Retorna o usuario com o determinado ID

    async create(req,res){
        let {email, name , password} = req.body;
        let valida;

        try {
            valida = await valida1(email, password);

            if(valida.status!==200){
                res.status(valida.status);
                res.json(valida.mensagem);
                return;
            }

            let user = await User.new(email, password, name);

            if(user===false){
                res.status(500);
                res.json({message:"Erro interno do sistema!"});
                return;
            }

            res.status(200);
            res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    //Possui nenhum Pârametro
    //Possui 3 Body(Email,Name,Password)
    //Retorna uma mensagem indicando se o usuario foi criado com sucesso ou se aconteceu algum erro

    async editUser(req,res){
        let id = req.params;
        let {email,name,role} = req.body;
        let idc = await User.findById(id);
        let date = {
            status: true,
            message: "Tudo OK",
            name: "",
            email: "",
            role: -1
        };

        try {
            if(idc===false){
                res.status(404);
                res.json("Usuário não cadastrado!");
                return;
            }

            date = await validageral(idc,name,email,role);

            if(date.status!==200){
                res.status(date.status);
                res.json(date.message);
                return;
            }

            try{
                let valida = await User.update(id.id,date.email, date.name,date.role);
                if(!valida.status) {
                    res.status(500);
                    res.json(valida.err);
                    return;
                }

                res.status(200);
                res.json(valida.message);
            }
            catch (err){
                res.status(500);
                res.json({message: "ERRO INTERNO NO SISTEMA"});
            }

        }
        catch (error){
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    //Possui 1 Parametro (ID)
    //Possui de 1 a 3 Body (Name,Email,Role)
    //Retorna mensagem indicando se usuario foi ou não editado com sucesso

    async delete(req,res){
        let id = req.params;
        let valida;

        try{
            valida = await User.delete(id.id);
            res.status(valida.statuscode);
            if(!valida.status){

                res.json({message:valida.err})
                return
            }

            res.json(valida.user);
        }
        catch (err){
            res.status(500);
            res.json({});
        }
    }
    //Possui 1 Parametro (ID)
    //Não possui Body
    //Retorna o usuário deletado, ou em caso de erro a mensagem de erro

    async recoverPass(req,res){
        let email = req.body.email;
        let result = await PasswordToken.create(email);

        if(!result.status){
            res.status(result.statuscode);
            res.json({message: result.err});
            return;
        }

        res.status(result.statuscode);
        res.json(result.token);
    }
    //Não possui Parametro
    //Possui 1 Body (email)
    //Retorna o token de recuperação de senha, ou em caso de erro a mensagem de erro

    async redefinepassword(req,res) {
        let id = req.params.id;
        let token = req.body.token;
        let newpassword = req.body.newpassword;
        let change;
        let used;

        try {
            let result = await PasswordToken.validate(token, id)

            if (!result.status) {
                res.status(result.statusCode);
                res.json(result.message);
                return;
            }

            change = await User.redefinepassword(newpassword, id);

            if(!change.status){
                res.status(change.statusCode);
                res.json(change.message);
                return
            }

            used = await PasswordToken.setTokenUsed(result.token);

            if(!used.status){
                res.status(used.statusCode);
                res.json(used.message);
                return
            }

            res.status(200);
            res.json({message: "Senha alterada com sucesso!"});
        }
        catch (err){
            console.log(err);
            res.status(500);
            res.json({message: "Erro na troca de senha"});
        }

    }
    //Possui 1 Params (ID)
    //Possui 2 Body (email,newpassword)
    //Retorna mensagem indicando se usuario a senha foi ou não editada com sucesso

    async login(req,res){
        let {email,password} = req.body;
        try {
            let result = await User.findEmail(email);

            if(result.email===undefined){
                res.status(404);
                res.json({message:"Usuário não encontrado!"});
                return;
            }

            if(!await bcrypt.compare(password,result.password)){
                res.status(401);
                res.json({message: "Senha Incorreta"});
                return;
            }

            let token = await jwt.sign({  email: result.email,role:result.role }, secret);

            res.status(200);
            res.json({message: "Login realizado com sucesso!",token:token});
        }
        catch (err){
            console.log(err);
            res.status(500);
            res.json({message:"Erro interno do sistema"})
        }
    }
    //Não possui Parametro
    //Possui 2 Body (email,password)
    //Retorna mensagem indicando se usuario conseguiu efetuar o login

}

async function valida1(email,password){
    let resultado = {
        status: 200,
        mensagem: "Tudo OK"
    }

    if(email===undefined || email.toString().indexOf("@") < 0 ){
        resultado.status = 411;
        resultado.mensagem="E-mail Inválido";
        return resultado;
    }
    else if(await User.findEmail(email)){
        resultado.status = 406;
        resultado.mensagem = "E-mail já cadastrado";
        return resultado;
    }
    else if(password===undefined || password.toString().indexOf(" ") > 0 || password.length < 6){
        resultado.status = 411;
        resultado.mensagem="Senha Inválida";
        return resultado;
    }
    else{
        return resultado;
    }
}
async function validageral(idc,name,email,role){
    let date = {
        status: 200,
        message: "Tudo OK",
        name: "",
        email: "",
        role: -1
    };
    let validaemail = await User.findByEmail(email);

    if(name === undefined && email === undefined && role === undefined){
        date.status = 400;
        date.message = "Nenhum dado foi enviado";
    }
    if(validaemail.id !== idc.id && validaemail !== false){
        date.status = 406;
        date.message = "E-mail já cadastrado";
    }
    if(email!==undefined && email.toString().indexOf("@") < 0){
        date.status = 406;
        date.message = "E-mail inválido";
    }
    if(name!==undefined){
        date.name=name;
    }
    else{
        date.name = idc.name;
    }
    if(email!==undefined){
        date.email = email;
    }
    else{
        date.email = idc.email;
    }
    if(role !== undefined){
        date.role = role;
    }
    else {
        date.role = idc.role;
    }

    return date;
}

module.exports = new UserController;
