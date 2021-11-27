const express = require("express");
const mgdb = require("mongoose");
const MongooseBuffer = require("mongoose/lib/types/buffer");

const db = require("../models/db"),
        users = require("../models/users");

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.route("/")
    .get((req, resp, next)=>{
        mgdb.model("Users").find({}, (err, users)=>{
            if(err){
                resp.status(500);
                resp.json({
                    "message":"There was a problem "
                })
            }
            resp.json(users)
        })
    })
    .post(function(req, resp){
        mgdb.model("Users").create(
            req.body,
            (err, users)=>{
                if(err){
                    resp.status(500);
                    resp.json({
                        "message":"There was a problem "
                    })
                }
                if(users){
                    resp.json(users);
                }else{
                    resp.status(400)
                    resp.json(users);
                }
            }
        )
    });

router.route("/:id")
   .get(function(req, resp){
       mgdb.model("Users").findById(req.params.id, (err, person)=>{
           if(err){
                resp.status(500);
                resp.json({
                    "message":"There was a problem "
                })
           }else if(person){
               resp.json(person)
           }else{
               resp.status(404)
               resp.json({"message":"Not Found"})
           }
       })
   })
   .put(function(req, resp){
       mgdb.model("Users").findById(req.params.id, (err, person)=>{
           if(err){
               resp.status(500);
               resp.json({"message":err});
           }else{
               person.updateOne(req.body, (err, peopleid)=>{
                   if(err){
                       resp.status(500)
                       resp.json({"message":"Error: Not has been updated."})
                   }
                   resp.json({
                       "_id":person._id,
                       "message":"Has been updated."
                   })
               })
           }
       })
   })
   .delete(function(req, resp){
        mgdb.model("Users").findById(req.params.id, (err, person)=>{
            if(err){
                resp.status(500);
                resp.json({
                    "message":"There was a problem "
                })
            }else{
                person.remove((err, people)=>{
                    if(err) {
                        resp.status(500);
                        resp.json({
                            "message":"There was a problem "
                        })
                    }
                    resp.json({
                        "message":"Has been deleted",
                        "people":person
                    })
                })
            }
        })
   })

module.exports = router;