let express = require("express")
let router = express.Router();
let ProductController = require("../controllers/ProductController");
let Auth = require("../middleware/Auth");

router.get("/",Auth,ProductController.allProducts);
router.get("/:id",Auth,ProductController.findProduct);
router.post("/new",Auth,ProductController.newProduct);
router.post("/edit",Auth,ProductController.updateProduct);
router.post("/remove",Auth,ProductController.removeProduct);

module.exports = router;
