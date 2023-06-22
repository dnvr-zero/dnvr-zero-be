"use strict";

const mongoose = require("mongoose");
const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});
module.exports = mongoose.model("Groups", GroupSchema);