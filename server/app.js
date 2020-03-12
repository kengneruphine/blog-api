const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./database');
const bodyParser = require("body-parser");
const path = require('path');

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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;