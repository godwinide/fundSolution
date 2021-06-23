const {connect} = require("mongoose")

module.exports = async () => {
    try{
        await connect(process.env.mongodb_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected")
    }catch(err){
        console.log("Error connection MongoDB: ", err);
    }
}