const dotenv = require("dotenv").config();

const msg = require("mongoose");
msg.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, (err, db)=>{
    if(err) throw err;
    console.log("success!! Database conected!")
})

module.exports = msg;
