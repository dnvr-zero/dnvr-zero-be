import request from "supertest"
const app = require('../../src/app')


describe("POST /tasks", () => {
    const newTask = {
        name: "task name should not exist",
        description: "task description random",
        points: "100",
        createdBy: "chainsaw",
    }


    it("returns 201", async () => {
        await request(app).post("/tasks").send(newTask).expect(201)
    })
})

describe("GET /tasks", () => {
    it("returns 200", async () => {
        await request(app).get("/tasks").expect(200)
    })
});