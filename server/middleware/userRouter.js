const express = require('express');

const { signUp, logIn, logOut } = require('../services/userService');

const userRouter = express.Router();

//Registrate new user
userRouter.post('/signup', signUp);

//Login user
userRouter.post('/login', logIn);

//Logout user
userRouter.post('/logout', logOut);

module.exports = userRouter;
