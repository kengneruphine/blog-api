const PostController = require('../controllers/post.controller');
const express = require('express');
const postRouter = express.Router();
const verify = require('../verifyToken');


postRouter.get('/posts', PostController.getAllPost);
postRouter.get('/posts/:postId', PostController.getPost);
postRouter.post('/posts', verify, PostController.createPost);
postRouter.put('/posts/:postId', verify, PostController.updatePost);
postRouter.delete('/posts/:postId', verify, PostController.deletePost);
postRouter.put('/posts/publish/:postId', verify, PostController.publishPost);

module.exports = postRouter;
