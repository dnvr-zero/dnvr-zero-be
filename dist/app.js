"use strict";

var _express = _interopRequireWildcard(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _swaggerDocs = _interopRequireDefault(require("./src/swagger/swaggerDocs.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const cors = require('cors');
require('dotenv/config');
const app = (0, _express.default)();
app.use(cors({
  origin: ['https://dnvr-zero-be.vercel.app/task', 'http://localhost:3000']
}));
const taskRouter = require('./routes/tasks');
const playerRouter = require('./routes/players');
const groupRouter = require('./routes/groups');
app.use(_express.default.json());
app.use("/tasks", taskRouter);
app.use("/players", playerRouter);
app.use("/groups", groupRouter);
const PORT = 8000;
app.use('/apidocs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swaggerDocs.default));
app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(_swaggerDocs.default);
});

// Routes
app.get('/', async (request, response) => {
  response.send('The node.js app works');
});
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
app.get('/auth', (req, res) => {
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
    res.redirect(`http://localhost:3000/player-profile?token=${token}`);
  }).catch(err => res.status(500).json({
    err: err.message
  }));
});

// Database connection
_mongoose.default.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB Connected ')).catch(err => console.log('error'));

// server up
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
module.exports = app;