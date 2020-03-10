const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    name: { type: String},
    email: { type: String},
    message:{type: String, required:true}
})

module.exports = mongoose.model('Comment', commentSchema);
