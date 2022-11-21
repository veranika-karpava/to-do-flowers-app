const express = require('express');

const userService = require('../services/userService');

// create router
const userRouter = express.Router();

// sign up new user
userRouter.post('/signup', userService.signUp);

// login existing user
userRouter.post('/login', userService.logIn);


module.exports = userRouter;