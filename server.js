const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const midRoute = require('./routes/midroute.route');

dotenv.config();
connectDB();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', midRoute);

const port = process.env.PORT || 4400;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
