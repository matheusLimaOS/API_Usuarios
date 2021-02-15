let express = require("express")
let router = express.Router();
let SellsController = require("../controllers/SellsController");

router.get("/",SellsController.allSell);
router.get("/:id",SellsController.allViSell);


module.exports = router;
