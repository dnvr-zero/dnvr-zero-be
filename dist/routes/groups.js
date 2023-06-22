"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const groupRouter = _express.default.Router();
const Groups = require('../models/Groups');

// Routes
/**
 * @swagger
 * /groups:
 *  get:
 *    tags:
 *      - [groups]
 *    summary: Get all the groups
 *    description: Use this endpoint to request all groups and return an array of JSON objects; No params required
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Request Failed
 * */
groupRouter.get("/", (request, response) => {
  Groups.find().then(resp => response.status(200).json(resp)).catch(err => response.status(400).json("Request Failed"));
});

/**
 * @swagger
 * /groups/{groupId}:
 *  get:
 *    tags:
 *      - [groups/:id]
 *    summary: request a single group
 *    description: If you have a group id,  add it to the endpoint by clicking `Try it out` and adding it in place of `groupId` field below; If you don't have a groupId, try the `GET /groups` endpoint above, and pull a groupId from one of the objects in the response
 *    responses:
 *      '200':
 *        description: A successful response
 *    parameters:
 *    - name: groupId
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 * */
groupRouter.get("/:id", (request, response) => {
  Groups.findById(request.params.id).then(resp => response.status(200).json(resp)).catch(err => response.status(400).json("Request Failed"));
});