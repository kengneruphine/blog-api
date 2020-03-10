const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String, required: true,
    },
    content: {
        type: String, required: true,
    },
    publish: {
        type:Boolean
    },
    // A post can have many comments
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'  // get us to get full fields of List
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema);
