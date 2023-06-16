// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdby: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    required: false,
  },
  points: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Tasks", TaskSchema);
