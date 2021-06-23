const router = require("express").Router();
const CommissionHistory = require("../../model/CommissionHistory");

// Get commission history
router.get("/", async(req,res) => {
    try{
        const history = await CommissionHistory.find({});
        return res.status(200).json({
            success: true,
            history: history.reverse()
        })
    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});


module.exports = router;