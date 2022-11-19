const express = require('express');

// create router
const usersRouter = express.Router();

// sign up for user
usersRouter.post('/signup');

// login for user
usersRouter.post('/login');


module.exports = usersRouter;