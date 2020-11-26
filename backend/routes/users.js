const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const linkValidation = /^((http|https):\/\/)(www\.)?([A-Za-z0-9.-]{1,256})\.[A-Za-z]{2,20}/;
const {
  getAllUsers,
  getUserById,
  patchProfileInfo,
  patchProfileAvatar,
  getUserInfo,
} = require('../controllers/users');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserById);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), patchProfileInfo);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().pattern(linkValidation).required(),
  }),
}), patchProfileAvatar);

module.exports = userRouter;
