const express = require('express');
const cookiesParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
const cors = require('cors');

const userRouter = require('./middleware/userRouter');
const taskRouter = require('./middleware/taskRouter');
const quoteRouter = require('./middleware/quoteRouter');

const app = express();

// for deploying - handle error not existing routes if any js file
app.use(express.static(path.join('public')));

// middlewares
// for handling CORS(cross-origin resource sharing) error
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  }),
);

//convert incoming data -> JSON obj to JS obj and parsed to req.body
app.use(express.json());
// for cookies
app.use(cookiesParser());

// for registration routers
app.use('/user', userRouter);
app.use('/tasks', taskRouter);
app.use('/quote', quoteRouter);

// for deploying  - anything else return index.html
app.use((_req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// for error-handling
app.use((error, _req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lhybrvz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(`${process.env.PORT || 5050}`, () => {
      console.log(`🚀 Server listening on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
