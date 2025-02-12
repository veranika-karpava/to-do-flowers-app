const express = require('express');
const cookiesParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const userRouter = require('./middleware/userRouter');
const taskRouter = require('./middleware/taskRouter');
const quoteRouter = require('./middleware/quoteRouter');

const app = express();

// CORS middleware: configures cross-origin resource sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  }),
);

// Middleware to parse incoming JSON requests into JS objects
app.use(express.json());

// Middleware to handle cookies in incoming requests
app.use(cookiesParser());

// Register route handlers for different parts of the app
app.use('/user', userRouter);
app.use('/tasks', taskRouter);
app.use('/quote', quoteRouter);

// Serve static files (e.g., images, CSS, JavaScript) from the 'public' directory - for deploying
app.use(express.static(path.join(__dirname, '/public')));

// Catch-all route for single-page applications (SPAs)
// If no API routes match, serve the 'index.html' file from the 'public' directory
app.use((_req, res) => {
  res.sendFile(path.resolve(__dirname, '/public/index.html'));
});

// Set default status code and message for errors
app.use((error, _req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
});

// MongoDB connection setup
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
