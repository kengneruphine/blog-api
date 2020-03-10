const CommentController = require('../controllers/comment.controller');
const express = require('express');
const commentRouter = express.Router();

commentRouter.get('/comments', CommentController.getAllComment);
commentRouter.get('/comments/:commentId', CommentController.getComment);
commentRouter.post('/comments', CommentController.createComment);
commentRouter.delete('/comments/:commentId', CommentController.deleteComment);

module.exports = commentRouter;