const msg = require("mongoose");
msg.connect("mongodb://192.168.20.23:27017/unidad3", (err, db)=>{
    if(err) throw err;
    console.log("success!! Database conected!")
})

module.exports = msg;
