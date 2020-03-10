const Post = require('../models/posts')

exports.getAllPost = async function (req, res) {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.getPost = async function (req, res) {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.createPost = async function (req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        publish: req.body.publish
    });
    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.updatePost = async function (req, res) {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    publish: req.body.publish
                }
            });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.deletePost = async function (req, res) {
    try {
        const removePost = await Post.deleteOne({ _id: req.params.postId });
        res.status(200).json(removePost);
    } catch (err) {
        res.json({ message: err });
    }
}

exports.publishPost = async function (req, res) {
    try {
        const publishPost = await Post.updateOne({ _id: req.params.postId },
            {
                $set: {
                    publish: req.body.publish
                }
            });
        res.status(200).json(publishPost);
    } catch (err) {
        res.json({ message: err });
    }
}