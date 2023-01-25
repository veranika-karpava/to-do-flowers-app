const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const JWT_KEY = process.env.JWT_SECRET_KEY;

// for creating new user/sign up User
const signUp = async (req, res, next) => {
  const { name, username, password } = req.body;
  // check if inputs are empty or not
  if (!name || !username || !password) {
    return next(new HttpError('Please make sure to include all inputs.', 422));
  }

  // check existing User in database
  let existingUser;

  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError(
        'User exists already, please use a diffrent one or login.',
        422
      )
    );
  }

  // for hashing password of new User
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Could not create user, please try again.', 500));
  }

  // create new User
  let createdNewUser;
  try {
    createdNewUser = new User({
      name,
      username,
      password: hashedPassword,
      tasks: [],
    });
  } catch (err) {
    console.log(err);
  }

  // save in database
  try {
    await createdNewUser.save();
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  // generate jwt token
  let jwtToken;
  try {
    jwtToken = jwt.sign(
      { userId: createdNewUser.id, username: createdNewUser.username },
      JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  res
    .status(201)
    .json({
      userId: createdNewUser.id,
      username: createdNewUser.username,
      jwtToken: jwtToken,
    });
};

// login existing user
const logIn = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new HttpError('Please make sure to include all inputs.', 422));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    return next(
      new HttpError('Logging in failed, please try again later.', 500)
    );
  }

  if (!existingUser) {
    return next(
      new HttpError('User is not found, please check your username', 422)
    );
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Could not log you in, please try again.', 500));
  }

  if (!isValidPassword) {
    return next(
      new HttpError('Please check your password, could not log you in.', 403)
    );
  }

  // generate jwt token
  let jwtToken;
  try {
    jwtToken = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again', 500));
  }

  res
    .status(200)
    .json({
      userId: existingUser.id,
      username: existingUser.username,
      jwtToken: jwtToken,
    });
};

exports.signUp = signUp;
exports.logIn = logIn;
