const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(500),
  }),
}), login);
authRouter.post('/signup', createUser);

module.exports = authRouter;
