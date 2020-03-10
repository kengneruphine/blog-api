const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DB_CONNECTION;

module.exports = function () {
    mongoose.connect(DB,{ useNewUrlParser: true })
    .then(() => {
        console.log('Successful connected to MongoDB');
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB");
        console.error(error);
   })
}
