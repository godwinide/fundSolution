const {model, Schema} = require("mongoose")

const CustomerSchema = new Schema({
    account_number:{
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    middlename: {
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: true,
        default: "male"
    },
    phone: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    },
    pendingCharges:{
        type: Number,
        required: false,
        default: 0
    },
    lastDeposit:{
        type: String,
        required: false,
        default: "none"
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
});

module.exports = Customer = model("Customer", CustomerSchema);