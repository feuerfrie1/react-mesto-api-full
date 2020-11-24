const cardRouter = require('express').Router();
const { createCard, getAllCards, deleteCard } = require('../controllers/cards');

cardRouter.post('/', createCard);
cardRouter.get('/', getAllCards);
cardRouter.delete('/:id', deleteCard);

module.exports = cardRouter;
