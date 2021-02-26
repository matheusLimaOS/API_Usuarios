let express = require("express")
let router = express.Router();
let SellsController = require("../controllers/SellsController");
let Auth = require("../middleware/Auth");

router.get("/",Auth,SellsController.allSell);
router.get("/:id",Auth,SellsController.allViSell);


module.exports = router;
