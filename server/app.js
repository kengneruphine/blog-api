const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database');
const bodyParser = require("body-parser");

const apiRouter = require('./routes/index');

const app = express();

//call the database connectivity function
db();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;