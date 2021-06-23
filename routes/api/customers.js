const router = require("express").Router();
const Customer = require("../../model/Customer");
const accountCreated = require("../../sms/accountCreated");

// Get all customers
router.get("/", async (req,res)=> {
    try{
        const customers = await Customer.find({});
        return res.json({success: true, customers});
    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});

// Get one customer by acc no
router.post("/findOne", async (req,res)=> {
    try{
        const {accountNum} = req.body;
        const customer = await Customer.findOne({account_number: accountNum});
        if(customer){
            return res.json({success: true, customer});
        }else{
            return res.status(400).json({
                success: false,
                msg: [{msg: "No customer with that account number!"}]
            });
        }
    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});

// Register Customer
router.post("/register", async (req,res) => {
    try{
        const {
            firstname,
            lastname,
            middlename,
            phone,
            city,
            state,
            gender
        } = req.body;

        if(!firstname || !lastname || !phone || !city || !state || !gender){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Please fill all fields!"}]
            });
        }

        const account_number = 211 + String(Math.random()).slice(2, 9);

        const accExists = await Customer.findOne({account_number});

        if(accExists){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Please try again!"}]
            });
        }

        const newCusomer = new Customer({
            firstname,
            lastname,
            middlename,
            phone,
            city,
            state,
            gender,
            account_number
        });
        await newCusomer.save();

        // send sms
        accountCreated(account_number, phone);

        return res.status(200).json({
            success: true,
            msg: [{msg: "Customer Registered Successfully"}]
        })

    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});


// update customer
router.post("/update", async(req,res) => {
    try{
        const {
            firstname,
            lastname,
            middlename,
            phone,
            city,
            state,
            balance,
            id
        } = req.body;


        if(!firstname || !lastname || !phone || !city || !state || !balance){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Please fill all fields!"}]
            });
        }

        await Customer.updateOne({_id:id}, {
            firstname,
            lastname,
            middlename,
            phone,
            city,
            state,
            balance
        })

        return res.status(200).json({
            success: true,
            msg: [{msg: "Customer updated Successfully"}]
        })
    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});

// Delete customer
router.post("/delete-customer", async (req,res) => {
    try{
        const {id} = req.body;
        if(!id){
            return res.status(400).json({
                success: false,
                msg: [{msg: "Please fill all fields!"}]
            });
        }

        await Customer.deleteOne({_id:id});
        return res.status(200).json({
            success: true,
            msg: [{msg: "Customer Deleted Successfully"}]
        })

    }catch(err){
        res.status(500).json({success: false, msg:[{msg:"Internal Server Error"}]})
    }
});



module.exports = router;