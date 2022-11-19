const express = require('express');

// create router
const userRouter = express.Router();

// sign up new user
userRouter.post('/signup');

// login existing user
userRouter.post('/login');


export default userRouter;