import express, { json } from 'express';
import mongoose from 'mongoose';
import swaggerDocs from '../src/swagger/swaggerdocs'
import swaggerUi from 'swagger-ui-express';
import axios from 'axios';
const cors = require('cors');
require('dotenv/config');

const app = express();

app.use(
  cors({
    origin: ['https://dnvr-zero-be.vercel.app/task', 'http://localhost:3000'],
  })
);

const taskRouter = require('./routes/tasks');
const playerRouter = require('./routes/players');
const groupRouter = require('./routes/groups');

app.use(express.json())
app.use("/tasks", taskRouter)
app.use("/players", playerRouter)
app.use("/groups", groupRouter)

const PORT = 8000;

app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocs()));

app.get('/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
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
    client_id: clientID,
  };
  const urlEncodedParams = new URLSearchParams(params).toString();
  
  res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`)
  })

  app.get("/oauth/redirect", (req, res) => {
    const { code } = req.query;
   
    const body = {
      client_id: clientID,
      client_secret: clientSecret,
      code,
    };
   
    let accessToken;
    const options = { headers: { accept: "application/json" } };
   
    axios
      .post("https://github.com/login/oauth/access_token", body, options)
      .then((response) => response.data.access_token)
      .then((token) => {
        accessToken = token;
        res.redirect(`http://localhost:3000/player-profile?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  });

// Database connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected '))
  .catch((err) => console.log('error'));

// server up
app.listen(PORT, () => console.log(`App listening at port ${PORT}`));

module.exports = app;