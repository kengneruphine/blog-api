const express = require('express');
const Comment = require('../models/comments');
const Post = require('../models/posts');

exports.getAllComment = async function (req, res) {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.getComment = async function (req, res) {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.createComment =  (req, res) => {
    const comment = new Comment();
    comment.message = req.body.message,
    comment.name = req.body.name,
    comment.email = req.body.email
    comment.save()
        .then(function (Comment) {
            return Post.findByIdAndUpdate({ _id: req.params.postId }, { $push: { comments: Comment._id } }, { new: true });
        })
        .then(function (Post) {
            res.json(Post);
        }).catch(function (err) {
            res.json(err);
        })
    //     .then((result) => {
    //         Post.findOne({ _id: req.params.post_id }, (err, post) => {
    //             if (post) {
    //                 post.comments.push(comment);
    //                  post.save();
    //                 console.log("post is", post)
    //                 res.json({ post })
    //             }
    //         });
    //     }).catch((error) => {
    //         res.status(500).json({ error });
    // })

}

// exports.createComment = async function (req, res) {

//     const comment = new Comment({
//         message: req.body.message,
//         name: req.body.name,
//         email: req.body.email
//     });
//     try {
//         const savedComment = await comment.save();
//         return Post.findByIdAndUpdate(
//             req.params.post_id,
//             { $push: { comments: savedComment._id} },
//             { new: true, useFindAndModify: false }
//         );

//         //res.status(201).json(post);
//     } catch (err) {
//         res.json({ message: err });
//     }
// }


exports.deleteComment = async function (req, res) {
    try {
        const removeComment = await Comment.remove({ _id: req.params.commentId });
        res.status(200).json(removeComment);
    } catch (err) {
        res.json({ message: err });
    }
}
