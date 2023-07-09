import request from "supertest"
import Tasks from "../../src/models/Tasks.js"
import app from "../../src/app.js"

afterEach(async () => {
    await Tasks.deleteMany()
})

describe("POST /tasks", () => {
    const newTask = {
        name: "task name should not exist",
        description: "task description random",
        points: "100",
        createdBy: "chainsaw",
        _id: "1",
    }

    it("returns 201", async () => {
        const response = await request(app).post("/tasks").send(newTask)

        expect(response.type).toEqual("application/json")
        expect(response.ok).toBe(true)
        expect(response.status).toEqual(201)
        expect(response.body._id).toBe("1")
        expect(response.body.name).toEqual("task name should not exist")
        expect(response.body.description).toEqual("task description random")
        expect(response.body.createdBy).toEqual("chainsaw")
        expect(response.body.points).toEqual("100")
    })
})

describe("GET /tasks", () => {
    it("returns 200", async () => {
        const task1 = await Tasks.create({
            _id: "1",
            name: "the first task",
            description: "description of the first task",
            createdBy: "fooBar",
            points: "100",
        })

        const response = await request(app).get("/tasks").expect(200)
        expect(response.ok).toBe(true)
        expect(response.status).toEqual(200)
        expect(response.type).toEqual("application/json")

        expect(response.body).toHaveProperty("data")
        expect(response.body.data.length).toEqual(1)
        expect(response.body.data[0]).toHaveProperty("_id")
        expect(response.body.data[0]._id).toEqual("1")
        expect(response.body.data[0]).toHaveProperty("createdBy")
        expect(response.body.data[0].createdBy).toEqual("fooBar")
        expect(response.body.data[0]).toHaveProperty("description")
        expect(response.body.data[0].description).toEqual(
            "description of the first task"
        )
        expect(response.body.data[0]).toHaveProperty("points")
        expect(response.body.data[0].points).toEqual("100")
    })
})

describe("GET /tasks/:id", () => {
    it("returns 200", async () => {
        const task1 = await Tasks.create({
            _id: "1",
            name: "get specific task",
            description: "foo descrip",
            createdBy: "foo user",
            points: "foo points",
        })

        const response = await request(app).get(`/tasks/${task1._id}`)
        expect(response.ok).toBe(true)
        expect(response.status).toEqual(200)
        expect(response.type).toEqual("application/json")
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toHaveProperty("_id")
        expect(response.body.data._id).toEqual("1")
    })
})

describe("PATCH /tasks/:id", () => {
    it("returns the updated player", async () => {
        const task1 = await Tasks.create({
            _id: "1",
            name: "patch a task",
            description: "we're going to update the description",
            createdBy: "fooBar",
            points: "100",
        })

        const response = await request(app).patch(`/tasks/${task1._id}`).send({
            description: "new description - has been patched",
        })
        expect(response.ok).toBe(true)
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data.description).toEqual(
            "new description - has been patched"
        )
    })
})

describe("DELETE /tasks/:id", () => {
    it("returns the delete document, with 202", async () => {
        const task1 = await Tasks.create({
            _id: "1",
            name: "sample task",
            description: "description of a sample task",
            createdBy: "sampleUser",
            points: "100 points",
        })

        const response = await request(app).delete(`/tasks/${task1._id}`)
        expect(response.ok).toBe(true)
        expect(response.status).toEqual(202)
        expect(response.body).toHaveProperty("data")

        const allTasks = await Tasks.find()
        expect(allTasks.length).toEqual(0)
    })
})
