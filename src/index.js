// const app = require('./app');
// require('dotenv/config');
import app from './app.js';
import 'dotenv/config';

// server up
app.listen(process.env.PORT, () => console.log(`App listening at port ${process.env.PORT}`));