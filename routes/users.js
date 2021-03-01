const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserInfo, updateUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getUserInfo);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateUserInfo);

module.exports = userRouter;
