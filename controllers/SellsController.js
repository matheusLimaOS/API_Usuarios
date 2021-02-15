let Sell = require("../models/Sells")

class SellsController{
    async allSell(req,res){
        let sells = await Sell.allSell();

        if(!sells.status){
            res.status(sells.statusCode);
            res.json(sells.message);
            return;
        }

        res.status(200);
        res.json(sells.sells);
    }
    async allViSell(req,res){
        let {id} = req.params;
        let sells = await Sell.allViSell(id);

        if(!sells.status){
            res.status(sells.statusCode);
            res.json(sells.message);
            return;
        }

        res.status(200);
        res.json(sells.sells);
    }
}

module.exports = new SellsController();
