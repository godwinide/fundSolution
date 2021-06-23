const express = require("express");
const app = express();
const cors = require("cors");


require("dotenv").config();
require("./config/db")();


app.use(cors())
app.use(express.json())
app.use(express.static("./client/build"));
app.use(express.urlencoded({extended: true}));

require("./urls")(app);


const PORT = process.env.PORT || 3303;

app.listen(PORT, ()=> console.log(`server started on port ${PORT}.`))


