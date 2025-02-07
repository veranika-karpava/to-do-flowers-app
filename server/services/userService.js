const HttpError = require('../models/http-error');
const User = require('../models/user');

const generateJWT = require('../utils/generateJWT');
const ERROR_MESSAGES = require('../utils/errorMessages');

// @desc Registrate new user
// route POST/user/signup
// @access Public
const signUp = async (req, res, next) => {
  let { username, email, password } = req.body;

  username = username.toLowerCase();
  email = email.toLowerCase();
  password = password.trim();

  if (!username || !email || !password) {
    return next(new HttpError(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELDS, 422));
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      const message =
        existingUser.username === username
          ? ERROR_MESSAGES.USER.DUPLICATE_USERNAME
          : ERROR_MESSAGES.USER.DUPLICATE_EMAIL;
      return next(new HttpError(message, 422));
    }
    const newUser = await User.create({
      username,
      email,
      password,
    });

    generateJWT(res, newUser);
    res.status(201).json({
      userName: newUser.username,
      userId: newUser.id,
      email: newUser.email,
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.USER.SIGNUP_FAILED, 500));
  }
};

// @desc Auth user/set token
// route POST/user/login
// @access Public
const logIn = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase();
  password = password.trim();

  if (!email || !password) {
    return next(new HttpError(ERROR_MESSAGES.VALIDATION.REQUIRED_FIELDS, 422));
  }

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return next(new HttpError(ERROR_MESSAGES.USER.NOT_FOUND, 422));
    }

    const isValidPassword = await existingUser.matchPassword(password);

    if (!isValidPassword) {
      return next(new HttpError(ERROR_MESSAGES.USER.INVALID_PASSWORD, 403));
    }

    generateJWT(res, existingUser);
    res.status(201).json({
      userName: existingUser.username,
      userId: existingUser.id,
      email: existingUser.email,
    });
  } catch {
    return next(new HttpError(ERROR_MESSAGES.USER.LOGIN_FAILED, 500));
  }
};

// @desc Logout user/ delete cookie
// route POST/user/logout
// @access Public
const logOut = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) return next(new HttpError(ERROR_MESSAGES.TOKEN.NO_CONTENT, 204));
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'Strict', secure: true });
  res.status(200).json({ message: ERROR_MESSAGES.USER.LOGOUT_SUCCESS });
};

exports.signUp = signUp;
exports.logIn = logIn;
exports.logOut = logOut;
