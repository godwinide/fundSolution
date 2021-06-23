const router = require("express").Router();
const Customer = require("../../model/Customer");
const History = require("../../model/History");
const alert = require("../../sms/alert");
const Admin = require("../../model/Admin");
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

        if(account.balance < amount){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Insufficient funds in customer account!"}]
            });
        }

        const newHistory = new History({
            customer_id: account._id,
            account_number,
            amount,
            type: "debit",
            balance: account.balance - parseInt(amount),
            cashier,
            date: new Date()
        });

        await account.updateOne({
            balance: account.balance - parseInt(amount),
            pendingCharges: account.pendingCharges + 3
        });
        await newHistory.save();
        alert(account_number, amount, "debit", account.phone, account.balance - parseInt(amount));
        return res.status(200).json({
            success: true,
            msg: [{msg: "Withdrawer Successful"}]
        })

    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
})


module.exports = router;