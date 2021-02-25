const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

const { UnauthorizedError, ConflictError } = require('../middlewares/errors');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user !== null) {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      }
    })
    .catch(next);
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash, // записываем хеш в базу
      })
        .then((user) => { res.send({ data: { id: user._id, email: user.email } }); })
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let token;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      if (process.env.NODE_ENV === 'production') {
        token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      } else {
        token = jwt.sign({ _id: user._id }, 'dev-secret', { expiresIn: '7d' });
      }

      // token = jwt.sign({ _id: user._id },
      // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      // вернём токен
      res.send({ token });
      return token;
    })
    .catch(() => { throw new UnauthorizedError('Неправильный логин или пароль. Проверьте введённые данные'); })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findOneAndUpdate({ _id: userId }, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
