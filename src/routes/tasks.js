import express from "express"

const router = express.Router()
const Tasks = require("../models/Tasks")

// Routes
/**
 * @swagger
 * /task:
 *  get:
 *    tags:
 *      - [task]
 *    summary: So this is where it goes....
 *    description: Use to request all tasks
 *    responses:
 *      '200':
 *        description: A successful response
 * */
router.get("/", (request, response) => {
    Tasks.find()
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /task:
 *  post:
 *    tags:
 *      - [task]
 *    summary: never you mind
 *    description: Use to create a new task
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskItem'
 *    responses:
 *      '201':
 *        description: Task successfully created
 *      '400':
 *        description: Missing required field
 * */
router.post("/", (request, response) => {
    const { name, createdby, description, points } = request.body
    const task = new Tasks({
        name,
        createdby,
        description,
        points,
    })
    task.save()
        .then((resp) => response.status(201).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

router.delete("/:id", (request, response) => {
    Tasks.deleteOne({ _id: request.params.id })
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

router.get("/:id", (request, response) => {
    Tasks.findById(request.params.id)
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

router.patch("/:id", (request, response) => {
    Tasks.updateOne({ _id: request.params.id }, { $set: request.body })
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

module.exports = router
