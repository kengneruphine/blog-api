let express = require('express');
let apiRouter = express.Router();
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const commentRouter = require('./commentRouter');

apiRouter.use('/user', userRouter);
apiRouter.use('/', commentRouter);
apiRouter.use('/', postRouter);

module.exports = apiRouter;