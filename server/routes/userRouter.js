const UserController = require('../controllers/user.controller');
const express = require('express');
const userRouter = express.Router();

userRouter.post('/register', UserController.registerUser);
userRouter.post('/login', UserController.loginUser);

module.exports = userRouter;