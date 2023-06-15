import express from 'express';
import mongoose from 'mongoose';
import items from './items';
require('dotenv/config');

const app = express();

// app.use(json())

const PORT = process.env.PORT || 3000;

app.get('/', async (request, response) => {
    response.send("Our node.js app works")
});

app.get('/items', (request, response) => {
    response.json({ status: true, message: "Fetched all items", data: items })
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
