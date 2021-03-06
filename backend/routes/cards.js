const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const linkValidation = /^((http|https):\/\/)(www\.)?([A-Za-z0-9.-]{1,256})\.[A-Za-z]{2,20}/;
const {
  createCard,
  getAllCards,
  deleteCard,
} = require('../controllers/cards');

cardRouter.get('/', getAllCards);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(linkValidation).required(),
  }),
}), createCard);
cardRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCard);

module.exports = cardRouter;
