const {model, Schema} = require("mongoose")

const CommissionHistorySchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = CommissionHistory = model("CommissionHistory", CommissionHistorySchema);