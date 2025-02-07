const express = require('express');
const { getRandomQuote } = require('../services/quoteService');

const quoteRouter = express.Router();

quoteRouter.get('/', getRandomQuote);

module.exports = quoteRouter;
