
const app = require("./routes")

let port = process.env.APP_PORT || 8000

const server = app.listen(port, ()=>{
    let host = server.address().address;
    if(process.env.NODE_ENV != "production") console.log("backend listening at http://", host, port)
});