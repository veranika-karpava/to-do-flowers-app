const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const JWT_KEY = process.env.JWT_SECRET_KEY;

// for creating new user/sign up User
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  // check if inputs are empty or not
  if (!username || !email || !password) {
    return next(new HttpError('Please make sure to include all inputs.', 422));
  }

  // check existing User in database
  let existingUser;

  try {
    existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  if (existingUser) {
    if (existingUser.username === username) {
      return next(
        new HttpError(
          'Username already taken, please choose a different one.',
          422
        )
      );
    } else if (existingUser.email === email) {
      return next(
        new HttpError(
          'Email address already registered, please use a different one or login.',
          422
        )
      );
    }
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
      username,
      email,
      password: hashedPassword,
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
      { userId: createdNewUser.id, email: createdNewUser.email },
      JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  res.status(201).json({
    userName: createdNewUser.username,
    userId: createdNewUser.id,
    email: createdNewUser.email,
    jwtToken: jwtToken,
  });
};

// login existing user
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HttpError('Please make sure to include all inputs.', 422));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError('Logging in failed, please try again later.', 500)
    );
  }

  if (!existingUser) {
    return next(
      new HttpError('User is not found, please check your email', 422)
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
  res.status(200).json({
    userName: existingUser.username,
    userId: existingUser.id,
    email: existingUser.email,
    jwtToken: jwtToken,
  });
};

exports.signUp = signUp;
exports.logIn = logIn;
