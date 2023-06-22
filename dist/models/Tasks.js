"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const mongoose = require("mongoose")

const TaskSchema = _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  createdby: {
    type: String,
    require: false
  },
  description: {
    type: String,
    required: false
  },
  points: {
    type: String,
    required: false
  }
});
module.exports = _mongoose.default.model("Tasks", TaskSchema);