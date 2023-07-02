import request from "supertest"
import Tasks from "../../src/models/Tasks.js"
import app from "../../src/app"

beforeEach(async () => {
    const task = new Tasks({
        name: 'test task name',
        description: 'test description',
        createdBy: 'foo person',
        points: '100'
    })

    task.save()
})


afterAll(async () => {
    await Tasks.deleteMany();
});

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
})
