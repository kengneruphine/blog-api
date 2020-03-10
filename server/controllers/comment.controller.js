const express = require('express');
const Comment = require('../models/comments')

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

exports.createComment = async function (req, res) {

    const comment = new Comment({
        message: req.body.message,
        name: req.body.name,
        email: req.body.email
    });
    try {
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
}


exports.deleteComment = async function (req, res) {
    try {
        const removeComment = await Comment.remove({ _id: req.params.commentId });
        res.status(200).json(removeComment);
    } catch (err) {
        res.json({ message: err });
    }
}
