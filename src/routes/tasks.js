import express from 'express';
const router = express.Router();
const Tasks = require("../models/Tasks");

router.get("/", (request, response) => {
  Tasks.find()
    .then((resp) => response.status(200).json(resp))
    .catch((err) => response.status(400).json("Request Failed"));
});

router.post("/", (request, response) => {
  const { name, createdby, description, points } = request.body;
  const task = new Tasks({
    name,
    createdby,
    description,
    points,
  });
  task
    .save()
    .then((resp) => response.status(201).json(resp))
    .catch((err) => response.status(400).json("Request Failed"));
});

router.delete("/:id", (request, response) => {
  Tasks.deleteOne({ _id: request.params.id })
    .then((resp) => response.status(200).json(resp))
    .catch((err) => response.status(400).json("Request Failed"));
});

router.post("/delete", (request, response) => {
  Tasks.deleteMany({_id: list, list: { $in: request.body.list } })
  .then((resp) => response.status(200).json(resp))
  .catch((err) => response.status(400).json("Request Failed"));
});

router.get("/:id", (request, response) => {
  Tasks.findById(request.params.id)
    .then((resp) => response.status(200).json(resp))
    .catch((err) => response.status(400).json("Request Failed"));
});

router.patch("/:id", (request, response) => {
  Tasks.updateOne({ _id: request.params.id }, { $set: request.body })
    .then((resp) => response.status(200).json(resp))
    .catch((err) => response.status(400).json("Request Failed"));
});

module.exports = router;