"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireWildcard(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _swaggerdocs = _interopRequireDefault(require("./swagger/swaggerdocs.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _axios = _interopRequireDefault(require("axios"));
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
var _tasks = _interopRequireDefault(require("./routes/tasks.js"));
var _players = _interopRequireDefault(require("./routes/players.js"));
var _groups = _interopRequireDefault(require("./routes/groups.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const app = (0, _express.default)();
app.use((0, _cors.default)({
  origin: ["https://dnvr-zero-be.vercel.app", "http://localhost:3000"]
}));
app.use(_express.default.json());
app.use("/tasks", _tasks.default);
app.use("/players", _players.default);
app.use("/groups", _groups.default);
app.use("/apidocs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup((0, _swaggerdocs.default)()));
app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(_swaggerdocs.default);
});

// Routes
app.get("/", async (request, response) => {
  response.send("The node.js app works");
});
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
app.get("/auth", (req, res) => {
  const params = {
    scope: "read:user",
    client_id: clientID
  };
  const urlEncodedParams = new URLSearchParams(params).toString();
  res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`);
});
app.get("/oauth/redirect", (req, res) => {
  const {
    code
  } = req.query;
  const body = {
    client_id: clientID,
    client_secret: clientSecret,
    code
  };
  let accessToken;
  const options = {
    headers: {
      accept: "application/json"
    }
  };
  _axios.default.post("https://github.com/login/oauth/access_token", body, options).then(response => response.data.access_token).then(token => {
    accessToken = token;
    res.redirect(`http://dnvr-zero.vercel.app/player-profile?token=${token}`);
  }).catch(err => res.status(500).json({
    err: err.message
  }));
});
const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.TEST_DB_CONNECTION : process.env.DEVELOPMENT_DB_CONNECTION;

// Database connection
if (process.env.MONGODB_URI) {
  _mongoose.default.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("DB Connected ")).catch(err => console.log("error"));
} else {
  _mongoose.default.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("DB Connected ")).catch(err => console.log("error"));
}
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => console.log(`App listening at port ${process.env.PORT}`));
}
var _default = app;
exports.default = _default;