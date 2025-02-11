const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET_KEY;
// const production = process.env.NODE_ENV === 'production';

const generateJWT = (res, user) => {
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_KEY, {
    expiresIn: '1h',
  });

  res.cookie('jwt', token, {
    maxAge: 60 * 60 * 1000, //  1hour
    httpOnly: true, //accessible only by web server
    sameSite: 'None', // cross-site cookie
    secure: true, //https
    domain: '.onrender.com',
  });
};

module.exports = generateJWT;
