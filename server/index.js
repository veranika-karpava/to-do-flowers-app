const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs'); //for working with file system

const HttpError = require('./models/http-error');
const userRouter = require('./middleware/userRouter');
const taskRouter = require('./middleware/taskRouter');


const app = express();

// registrate cors(cross-origin resource sharing) middleware
app.use(cors({
    origin: process.env.CLIENT_URL
}));

// registrate middleware for parsing data/convert JSON obj to JS obj
app.use(express.json());

// registrate middleware for routers
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

// connection with MongoDB database and listen port
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhybrvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(`${process.env.PORT}`, () => {
            console.log(`🚀 Server listening on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    });

