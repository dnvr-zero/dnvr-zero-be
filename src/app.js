import express, { json } from 'express';
import mongoose from 'mongoose';
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
require("dotenv/config")

const app = express()

const taskRouter = require("./routes/tasks")

app.use(express.json())
app.use("/task", taskRouter)

const PORT = process.env.PORT || 3000

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        components: {
            schemas: {
                TaskItem: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                            example: "username",
                        },
                        description: {
                            type: "string",
                            example: "a really cool description of the task",
                        },
                        points: {
                            type: "string",
                            example: "50 points",
                        },
                        createdby: {
                            type: "string",
                            example: "Bob Robbedsky"
                        }
                    },
                },
            },
        },
        info: {
            title: "dnvr-zero-be",
            summary: "the backend endpoints for the SOA of dnvr-zero",
            description:
                "documentation for the available endpoints to retrieve, udpate, delete data from dnvr-zero-be",
            version: "3.0.0",
            contact: {
                name: "Michael Marchand",
            },
            servers: ["http://localhost:3000"],
        },
    },
    apis: ["src/routes/*.js"],
}

const swaggerDocs = swaggerJsdoc(options)
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes
app.get("/", async (request, response) => {
    response.send("The node.js app works")
})

// Database connection
mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected "))
    .catch((err) => console.log('error'));

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

module.exports = app;