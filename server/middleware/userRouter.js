const express = require('express');

const { signUp, logIn } = require('../services/userService');

// create router
const userRouter = express.Router();

// sign up new user
userRouter.post('/signup', signUp);

// login existing user
userRouter.post('/login', logIn);

module.exports = userRouter;
