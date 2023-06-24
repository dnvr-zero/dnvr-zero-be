import router from "../../src/routes/tasks.js"
import request from "supertest"
import express from "express"

// const baseURL = "http://localhost:8000"
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use("/tasks", router)

describe("GET /tasks", () => {
    const newTask = {
        name: "task name should not exist",
        description: "task description random",
        points: "100",
        createdby: "chainsaw",
    }
    beforeAll(async () => {
        await request(app).post("/tasks").send(newTask)
    })
    afterAll(async () => {
        await request(app).delete(`/tasks/${newTask.id}`)
    })
    it("should return 200", (done) => {
      request(app)
        .get("/tasks")
        .expect(200, done);
    })
    // it("should return tasks", async () => {
    //   const response = await request(baseURL).get("/tasks");
    //   expect(response.body.data.length >= 1).toBe(true);
    // });
})
