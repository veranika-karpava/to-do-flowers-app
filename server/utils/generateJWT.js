const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET_KEY;

const generateJWT = async (res, user) => {
  // Create the JWT token with the user's id and email as payload
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_KEY, {
    expiresIn: '1h',
  });

  // Set the cookie with the JWT token
  res.cookie('jwt', token, {
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    httpOnly: true, // The cookie can only be accessed by the server, not JavaScript
    sameSite: 'Strict', // Cross-site cookie prevention
    secure: true, //ensure HTTPS in production
  });
};

module.exports = generateJWT;
