const {model, Schema} = require("mongoose")

const HistorySchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    account_number: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cashier:{
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    },
});

module.exports = History = model("History", HistorySchema);