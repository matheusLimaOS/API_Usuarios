let express = require("express")
let router = express.Router();
let UserController = require("../controllers/UserController");

router.get("/user",UserController.index);
router.get("/user/:id", UserController.findUser);

router.post('/user',UserController.create);
router.post("/recoverpassword",UserController.recoverPass);
router.post("/user/login",UserController.login);

router.put("/user/:id", UserController.editUser);
router.put("/recoverpassword/:id",UserController.redefinepassword);

router.delete("/user/:id", UserController.delete);

module.exports = router;