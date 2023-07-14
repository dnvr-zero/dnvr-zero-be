import app from './app.js';
import 'dotenv/config';

// server up
app.listen(8000, () => console.log(`App listening at port ${8000}`));