import express from "express"

const playerRouter = express.Router()
const Players = require("../models/Players.js")

// Routes
/**
 * @swagger
 * /players:
 *  get:
 *    tags:
 *      - [players]
 *    summary: Get all the players
 *    description: Use this endpoint to request all players and return an array of JSON objects; No params required
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
 * */
playerRouter.get("/", (request, response) => {
    Players.find()
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /players:
 *  post:
 *    tags:
 *      - [players]
 *    summary: Add a player to the database
 *    description: Use this endpoint to create a new player; be sure to pass at minimum the name of the new player as JSON in the body of the request. You can also pass description, points, and createdby. All arguments should be strings. Don't forget to use double quotes when writing JSON.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PlayerItem'
 *    responses:
 *      '201':
 *        description: player successfully created
 *      '400':
 *        description: Missing required field
 * */
playerRouter.post("/", (request, response) => {
    const { username, level, score, group_id, email } = request.body
    const player = new Players({
        username,
        level,
        score,
        email,
        group_id
    })
    player.save()
        .then((resp) => response.status(201).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /players/{playerId}:
 *  get:
 *    tags:
 *      - [players/:id]
 *    summary: request a single player
 *    description: If you have a player id,  add it to the endpoint by clicking `Try it out` and adding it in place of `playerId` field below; If you don't have a playerId, try the `GET /players` endpoint above, and pull a playerId from one of the objects in the response
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *    - name: playerId
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 * */
playerRouter.get("/:id", (request, response) => {
    Players.findById(request.params.id)
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /players/{playerId}:
 *  patch:
 *    tags:
 *      - [players/:id]
 *    summary: Update one of the fields for a specific player
 *    description: If something isn't right in one of the fields of a player, click `Try it out` below and replace `playerId` with the actual id of a player; Be sure to pass in any information that needs to be updated as JSON in the body of the request; Don't forget to use double quotes when writing JSON
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/playerItem'
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
 *    parameters:
 *    - name: playerId
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 * */
playerRouter.patch("/:id", (request, response) => {
    Players.updateOne({ _id: request.params.id }, { $set: request.body })
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

/**
 * @swagger
 * /players/{playerId}:
 *  delete:
 *    tags:
 *      - [players/:id]
 *    summary: Use this endpoint to delete a single player
 *    description: if you have a player id, then include it in the http request, and it will be removed from the database; no params required
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
 *    parameters:
 *    - name: playerId
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 * */
playerRouter.delete("/:id", (request, response) => {
    Tasks.deleteOne({ _id: request.params.id })
        .then((resp) => response.status(200).json(resp))
        .catch((err) => response.status(400).json("Request Failed"))
})

module.exports = playerRouter
