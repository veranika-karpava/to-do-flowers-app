const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const ERROR_MESSAGES = require('../utils/errorMessages');

const JWT_KEY = process.env.JWT_SECRET_KEY;

const protect = async (req, res, next) => {
  const token = req.cookies?.jwt;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch {
      return next(new HttpError(ERROR_MESSAGES.TOKEN.TOKEN_FAILED, 401));
    }
  } else {
    return next(new HttpError(req.cookies, 401));
  }
};

module.exports = protect;
