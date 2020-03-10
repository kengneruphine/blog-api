let express = require('express');
let apiRouter = express.Router();
const userRouter = require('./userRouter')

apiRouter.use('/user', userRouter);
// apiRouter.use('/comment', commentRouter);
// apiRouter.use('/post', postRouter);

module.exports = apiRouter;