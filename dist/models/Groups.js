"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const mongoose = require("mongoose")

const GroupSchema = _mongoose.default.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// module.exports = mongoose.model("Groups", GroupSchema)
var _default = _mongoose.default.model("Groups", GroupSchema);
exports.default = _default;