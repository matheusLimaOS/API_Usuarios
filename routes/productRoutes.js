let express = require("express")
let router = express.Router();
let ProductController = require("../controllers/ProductController");

router.get("/",ProductController.allProducts);
router.get("/:id",ProductController.findProduct);
router.post("/new",ProductController.newProduct);
router.post("/edit",ProductController.updateProduct);
router.post("/remove",ProductController.removeProduct);

module.exports = router;
