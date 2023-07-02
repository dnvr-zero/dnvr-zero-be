"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const mongoose = require("mongoose")

const PlayerSchema = _mongoose.default.Schema({
  username: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: false
  },
  score: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false,
    default: "email@email.com"
  },
  groupID: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// module.exports = mongoose.model("Players", PlayerSchema)
var _default = _mongoose.default.model("Players", PlayerSchema);
exports.default = _default;