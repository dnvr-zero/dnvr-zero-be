import express, { json } from "express"
import mongoose from "mongoose"
import swaggerDocs from "./swagger/swaggerdocs.js"
import swaggerUi from "swagger-ui-express"
import axios from "axios"
import cors from "cors"
import "dotenv/config"
import taskRouter from "./routes/tasks.js"
import playerRouter from "./routes/players.js"
import groupRouter from "./routes/groups.js"

const app = express()

app.use(
    cors({
        origin: ["https://dnvr-zero-be.vercel.app", "http://localhost:3000"],
    })
)

app.use(express.json())
app.use("/tasks", taskRouter)
app.use("/players", playerRouter)
app.use("/groups", groupRouter)

app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs()))

app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerDocs)
})

// Routes
app.get("/", async (request, response) => {
    response.send("The node.js app works")
})

const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

app.get("/auth", (req, res) => {
    const params = {
        scope: "read:user",
        client_id: clientID,
    }
    const urlEncodedParams = new URLSearchParams(params).toString()

    res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`)
})

app.get("/oauth/redirect", (req, res) => {
    const { code } = req.query

    const body = {
        client_id: clientID,
        client_secret: clientSecret,
        code,
    }

    let accessToken
    const options = { headers: { accept: "application/json" } }

    axios
        .post("https://github.com/login/oauth/access_token", body, options)
        .then((response) => response.data.access_token)
        .then((token) => {
            accessToken = token
            res.redirect(`http://dnvr-zero.vercel.app/player-profile?token=${token}`)
        })
        .catch((err) => res.status(500).json({ err: err.message }))
})

const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_DB_CONNECTION
        : process.env.DEVELOPMENT_DB_CONNECTION

// Database connection
if (process.env.MONGODB_URI) {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB Connected "))
        .catch((err) => console.log("error"))
} else {
    mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB Connected "))
        .catch((err) => console.log("error"))
}

if (process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT, () =>
        console.log(`App listening at port ${process.env.PORT}`)
    )
}

export default app
