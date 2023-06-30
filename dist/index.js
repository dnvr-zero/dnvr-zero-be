"use strict";

var _app = _interopRequireDefault(require("./app.js"));
require("dotenv/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// const app = require('./app');
// require('dotenv/config');

// server up
_app.default.listen(process.env.PORT, () => console.log(`App listening at port ${process.env.PORT}`));