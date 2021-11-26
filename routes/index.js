const dotenv = require("dotenv")

const cors =require("cors")
const express = require("express");
const app = express();

app.use(cors({
    origin:"*"
}))

const usersRoutes = require("./users");

app.use("/api/students", usersRoutes);

app.get("/api",(req, resp)=>{
    resp.json({
        "message":"pong"
    })
})

module.exports = app;
