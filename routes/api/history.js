const router = require("express").Router();
const History = require("../../model/History");

// Get history
router.get("/", async(req,res) => {
    try{
        const history = await History.find({});
        return res.status(200).json({
            success: true,
            history: history.reverse()
        })
    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});


module.exports = router;