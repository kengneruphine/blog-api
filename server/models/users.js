const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    // A user can create many posts
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'  // get us to get full fields of List
        }
    ]
})

module.exports = mongoose.model('User', userSchema);
