const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'dev-secret' } = process.env;

const { UnauthorizedError } = require('./errors.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log(JWT_SECRET, '1');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
  return res;
};
