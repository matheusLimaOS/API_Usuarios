let bodyParser = require('body-parser')
let express = require("express")
let app = express()
let userRouter = require("./routes/userRoutes");
let productRouter = require("./routes/productRoutes");
const cors = require("cors");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Liberando acesso do CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONSr');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,authorization");
    app.use(cors());
    next();
})

app.use("/",userRouter);
app.use("/product",productRouter);

app.listen(8686,() => {
    console.log("Servidor rodando")
});
