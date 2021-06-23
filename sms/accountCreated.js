const axios = require("axios");
module.exports = function (accountNum, phone){
    const body = `Congratulations, your account has been registered. Ac no: ${accountNum}.`    
    axios(`https://portal.nigeriabulksms.com/api/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASSWORD}&message=${body}&sender=FSNIG&verbose=true&mobiles=234${String(phone).slice(1)}`)
    .catch(err => console.log(err))
}