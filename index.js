const cors =require("cors")
const express = require("express");
const app = express();

app.use(cors({
    origin:"*"
}))

const usersRoutes = require("./routes/users");
app.use("/api/students", usersRoutes);
app.get("/api",(req, resp)=>{
    resp.json({
        "message":"pong"
    })
})
app.get("/",(req, resp)=>{
    resp.json({
        "message":"pong"
    })
})

const server = app.listen(8000, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("backend listening at http://", host, port)
});