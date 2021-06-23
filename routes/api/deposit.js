const router = require("express").Router();
const Customer = require("../../model/Customer");
const History = require("../../model/History");
const Admin = require("../../model/Admin");
const CommissionHistory = require("../../model/CommissionHistory");
const alert = require("../../sms/alert");
const auth = require("../../middleware/auth");

router.post("/", auth, async(req,res) => {
    try{
        const {amount, account_number} = req.body;
        if(!amount || !account_number || account_number.length !== 10){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Please fill all fields correctly!"}]
            });
        }

        const account = await Customer.findOne({account_number});
        const cashier = await Admin.findById(req.user.id)
        if(!account){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Invalid account number!"}]
            });
        }
        // check if commission history exist
        const date = new Date().getMonth() + "/" + new Date().getFullYear();
        let commissionHistExist = await CommissionHistory.findOne({date});
        if(!commissionHistExist){
            const newComHist = new CommissionHistory({date});
            await newComHist.save();
        };

        const newHistory = new History({
            customer_id: account._id,
            account_number,
            amount,
            type: "credit",
            balance: account.lastDeposit == date ? account.balance + parseInt(amount) : account.balance + parseInt(amount/2),
            cashier,
            date: new Date()
        });

        if(account.lastDeposit != date){
            await account.updateOne({
                balance: account.balance + parseInt(amount/2),
                pendingCharges: account.pendingCharges + 3,
                lastDeposit: date
            });
            const commissionHist = await CommissionHistory.findOne({date});
            await commissionHist.updateOne({
                balance: commissionHist.balance + parseInt(amount / 2)
            })
        }else{
            await account.updateOne({
                balance: account.balance + parseInt(amount/2),
                pendingCharges: account.pendingCharges + 3
            });
        }
        
        await newHistory.save();
        if(account.lastDeposit == date){
            alert(account_number, amount, "credit", account.phone, account.balance + parseInt(amount));
        }else{
            alert(account_number, amount, "credit", account.phone, account.balance + parseInt(amount/2));
        }
        return res.status(200).json({
            success: true,
            msg: [{msg: "Deposit Successful"}]
        })

    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
})


module.exports = router;