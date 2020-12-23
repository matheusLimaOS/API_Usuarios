let express = require("express")
let router = express.Router();
let ProductController = require("../controllers/ProductController");

router.get("/",ProductController.allProducts);
router.get("/:id",ProductController.findProduct);
router.post("/new",ProductController.newProduct);

module.exports = router;
