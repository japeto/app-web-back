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
            if(err) throw err;
            resp.json(users)
        })
    })
    .post(function(req, resp){
        mgdb.model("Users").create(
            req.body,
            (err, users)=>{
                if(err) resp.json({"message": "people does not saved"});

                console.log("saved ", users);
                resp.json(users);
            }
        )
    });

router.route("/:id")
   .get(function(req, resp){
       mgdb.model("Users").findById(req.params.id, (err, person)=>{
           if(err){
               console.log("There was a problem", err);
           }else{
               console.log("Retrieving id ", req.params.id);
               resp.json(person)
           }
       })
   })
   .put(function(req, resp){
       mgdb.model("Users").findById(req.params.id, (err, person)=>{
           if(err){
               console.log("There was a problem ", err);
               resp.status(500);
               resp.json({"message":err});
           }else{
               person.updateOne(req.body, (err, peopleid)=>{
                   if(err) console.log("There was a problem ", err)
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
                console.log("There was a problem ", err);
                resp.status(500);
                resp.json({
                    "message":"There was a problem "
                })
            }else{
                person.remove((err, people)=>{
                    if(err) console.log("Does not remove");
                    resp.json({
                        "message":"Has been deleted",
                        "people":person
                    })
                })
            }
        })
   })

module.exports = router;