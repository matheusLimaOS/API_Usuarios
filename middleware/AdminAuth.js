let jwt = require("jsonwebtoken");
let secret = "ibwegbababjanopbapounb";

module.exports = function (req,res,next){
    const AuthToken = req.headers['authorization'];
    let decode;

    if(AuthToken === undefined){
        res.status(401);
        res.json({message: "Token inválido"});
        return;
    }

    const bearer = AuthToken.split(' ');
    let token = bearer[1];

    try {
        decode = jwt.verify(token,secret);
    }
    catch (err){
        console.log(err);
        res.status(500);
        res.json({message: "Erro interno do sistema -- AdminAuth"});
        return;
    }

    if(decode.role!==1){
        res.status(403);
        res.json({message: "Não autorizado a entrar nessa rota!"});
        return;
    }

    next();
}