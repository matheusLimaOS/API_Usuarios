let express = require("express")
let router = express.Router();
let CartController = require("../controllers/CartController");

router.get("/:usuario",CartController.ListProductsCart)
router.post("/addcart",CartController.addProductCart);
router.post("/finishcart/:usuario",CartController.finishCart);
router.delete("/clearcart/:usuario",CartController.clearCart);


module.exports = router;
