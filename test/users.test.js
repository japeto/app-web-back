const app = require("../routes")

const expect = require("chai").expect;
const assert = require("chai").assert;
const request = require("supertest");

const aStudent = require("./aStudent.json")

describe("Server a live message",
    ()=>{
        it("Get all students", ()=>{
            return request(app)
            .get("/api/students")
            .expect(200, [])
        })
        it("Create a new students", ()=>{
            return request(app)
            .post("/api/students")
            .send(aStudent)
            .set("Accept", "application/json")
            .expect('Content-type', /json/)
            .expect(200)
            .then(resp=>{
                assert(resp.body.email, aStudent.email)
            })
        })
        it("GET a non-existent students", ()=>{
            return request(app)
            .get("/api/students/61a16b56a905f6747b6a8539")
            .expect(404, {"message":"Not Found"})
        })
        it("GET a existent student", ()=>{
            return request(app)
            .get(`/api/students/${aStudent._id}`)
            .set("Accept", "application/json")
            .expect('Content-type', /json/)
            .expect(200)
            .then(resp=>{
                assert(resp.body.email, aStudent.email)
            })
        })

        let otherStudent = Object.assign({}, aStudent);
        otherStudent.type = "Professor"
        
        it("PUT a existent student", ()=>{
            return request(app)
            .put(`/api/students/${aStudent._id}`)
            .send(otherStudent)
            .set("Accept", "application/json")
            .expect('Content-type', /json/)
            .expect(200)
            .then(resp=>{
                assert(resp.body._id, aStudent._id)
                assert(resp.body.message, 'Has been updated.')
            })
        })

        it("DELETE a existent student", ()=>{
            return request(app)
            .delete(`/api/students/${aStudent._id}`)
            .expect(200)
        })
        // it("Get all students", ()=>{
        //     return request(app)
        //     .get("/api/students")
        //     .expect(200, [])
        // })
    }
)