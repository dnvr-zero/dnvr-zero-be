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
 *    summary: Get all the tasks
 *    description: Use this endpoint to request all tasks and return an array of JSON objects; No params required
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
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
 *    summary: Add a task to the database
 *    description: Use this endpoint to create a new task; be sure to pass at minimum the name of the new task as JSON in the body of the request. You can also pass description, points, and createdby. All arguments should be strings. Don't forget to use double quotes when writing JSON.
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

/**
 * @swagger
 * /task/:id:
 *  delete:
 *    tags:
 *      - [task/:id]
 *    summary: Use this endpoint to delete a single task
 *    description: if you have a task :id, then include it in the http request, and it will be removed from the database; no params required
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
 * */
router.delete("/:id", (request, response) => {
    Tasks.deleteOne({ _id: request.params.id })
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /task/:id:
 *  get:
 *    tags:
 *      - [task/:id]
 *    summary: request a single task
 *    description: If you have a task id, simply add it to the endpoint in place of `{taskId}`
 *    responses:
 *      '200':
 *        description: A successful response
 * */
router.get("/:id", (request, response) => {
    Tasks.findById(request.params.id)
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /task/:id:
 *  patch:
 *    tags:
 *      - [task/:id]
 *    summary: Update one of the fields for a specific task
 *    description: If something isn't right in one of the fields of a task, replaced `:id` with the actual id of a task; Be sure to pass in any information that needs to be updated as JSON in the body of the request; Don't forget to use double quotes when writing JSON
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskItem'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
 * */
router.patch("/:id", (request, response) => {
    Tasks.updateOne({ _id: request.params.id }, { $set: request.body })
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

module.exports = router
