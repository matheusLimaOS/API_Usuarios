let express = require("express")
let router = express.Router();
let CartController = require("../controllers/CartController");
let Auth = require("../middleware/Auth");

router.get("/:usuario",Auth,CartController.ListProductsCart)
router.post("/addcart/:id",Auth,CartController.addProductCart);
router.post("/addquant/:id",Auth,CartController.addQuantProdCart);
router.post("/finishcart/:usuario",Auth,CartController.finishCart);
router.delete("/clearcart/:usuario",Auth,CartController.clearCart);
router.delete("/remove/:id",Auth,CartController.removeCart);

module.exports = router;
