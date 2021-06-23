const axios = require("axios");

module.exports = function (accountNum, amount, trans_type, phone, balance){
    const body = `
Txn: ${trans_type}
Ac: ${accountNum[0]}XX..${accountNum.slice(8,10)}X
Amt: ${amount}
Bal: ${balance}.`;    
    axios(`https://portal.nigeriabulksms.com/api/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASSWORD}&message=${body}&sender=FSNIG&verbose=true&mobiles=234${String(phone).slice(1)}`)
    .catch(err => console.log(err))

}