let express = require("express")
let app = express();
let router = express.Router();
let HomeController = require("../controllers/HomeController");
let UserController = require("../controllers/UserController");
let AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user',UserController.create);
router.get("/user",AdminAuth,UserController.index);
router.get("/user/:id", UserController.findUser);
router.put("/user/:id", UserController.editUser);
router.delete("/user/:id", UserController.delete);
router.post("/recoverpassword",UserController.recoverPass);
router.put("/recoverpassword/:id",UserController.redefinepassword);
router.post("/user/login",UserController.login);




module.exports = router;