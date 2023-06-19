"use strict";

var _express = _interopRequireWildcard(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
require("dotenv/config");
const app = (0, _express.default)();
const taskRouter = require("./routes/tasks");
app.use(_express.default.json());
app.use("/task", taskRouter);
app.use((0, _cors.default)());
const PORT = process.env.PORT || 3000;
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "dnvr-zero-be",
      summary: "the backend endpoints for the SOA of dnvr-zero",
      description: "documentation for the available endpoints to retrieve, update, delete data from dnvr-zero-be",
      version: "3.0.0",
      contact: {
        name: "Michael Marchand",
        email: "MichaelDavidMarchand@gmail.com"
      }
    },
    servers: [{
      url: "https://dnvr-zero-be.vercel.app",
      description: "Production Server"
    }, {
      url: "http://localhost:3000",
      description: "Development Server"
    }],
    paths: {},
    components: {
      schemas: {
        TaskItem: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              example: "name of task"
            },
            description: {
              type: "string",
              example: "a really cool description of the task"
            },
            points: {
              type: "string",
              example: "50 points"
            },
            createdby: {
              type: "string",
              example: "Anon Player"
            }
          }
        }
      }
    },
    security: [],
    tags: [],
    externalDocs: {
      description: "To see additional documentation for the project, click here",
      url: "https://github.com/dnvr-zero"
    }
  },
  apis: ["src/routes/*.js"]
};
const swaggerDocs = (0, _swaggerJsdoc.default)(options);
app.use("/apidocs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerDocs));
app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

// Routes
app.get("/", async (request, response) => {
  response.send("The node.js app works");
});

// Database connection
_mongoose.default.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB Connected ")).catch(err => console.log("error"));
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
module.exports = app;