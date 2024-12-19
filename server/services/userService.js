const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const JWT_KEY = process.env.JWT_SECRET_KEY;

const generateJWT = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_KEY,
    { expiresIn: '1h'}
  );
};

// for creating the new user
const signUp = async (req, res, next) => {
  let { username, email, password } = req.body;

  username = username.toLowerCase();
  email = email.toLowerCase();
  password = password.trim();

  // check all inputs have value
  if (!username || !email || !password) {
    return next(new HttpError('Please make sure to include all inputs.', 422));
  };

  try {
    // check for existing user
    const existingUser = await User.findOne({$or: [{ username: username }, { email: email }],});

    if (existingUser) {
      const message = existingUser.username === username
        ? 'Username is already taken. Please choose a different one.'
        : 'Email address is already registered. Please use a different one or login.';
      return next(new HttpError(message, 422));
    };

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // generate and send JWT
    const token = generateJWT(newUser);

    // set cookies
    res.cookie('token', token, {
      httpOnly: true,
      withCredentials: true,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000, // 1 hour
    });

    return res.status(201).json({
      userName: newUser.username,
      userId: newUser.id,
      email:newUser.email,
      jwtToken: token,
    });
  } catch {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }
};

// login existing user
const logIn = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase();
  password = password.trim();

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
