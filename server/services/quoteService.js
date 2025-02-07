const HttpError = require('../models/http-error');
// @desc Get quote
// @route GET/quote
// @access Private
const getRandomQuote = async (_req, res, next) => {
  try {
    const response = await fetch(process.env.QUOTE_URL);
    if (!response.ok) {
      throw next(new HttpError(ERROR_MESSAGES.QUOTE.QUOTE_ERROR, 500));
    }
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw next(new HttpError(ERROR_MESSAGES.QUOTE.QUOTE_ERROR, 500));
    }

    res.status(200).json({
      text: data[0].q,
      author: data[0].a,
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.QUOTE.QUOTE_ERROR, 500));
  }
};

exports.getRandomQuote = getRandomQuote;
