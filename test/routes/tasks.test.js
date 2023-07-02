import request from "supertest"
import Tasks from "../../src/models/Tasks.js"
import app from "../../src/app.js"

afterAll(async () => {
    await Tasks.deleteMany()
})

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
        const test = await request(app).get("/tasks").expect(200)
        expect(test.body.data).toBeTruthy
    })
})
