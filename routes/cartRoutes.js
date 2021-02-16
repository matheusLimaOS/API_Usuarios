let express = require("express")
let router = express.Router();
let CartController = require("../controllers/CartController");

router.get("/:usuario",CartController.ListProductsCart)
router.post("/addcart/:id",CartController.addProductCart);
router.post("/addquant/:id",CartController.addQuantProdCart);
router.post("/finishcart/:usuario",CartController.finishCart);
router.delete("/clearcart/:usuario",CartController.clearCart);
router.delete("/remove/:id",CartController.removeCart);

module.exports = router;
