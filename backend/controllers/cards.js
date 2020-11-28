const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findByIdAndRemove({ _id: req.params.id, owner })
    .then((card) => {
      if (card) {
        res.send(card);
        return;
      }
      throw new NotFoundError({ message: 'Нет карточки с таким id' });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError({ message: 'Нет карточки с таким id' });
      }
      throw new ForbiddenError({ message: 'Необходима авторизация' });
    })
    .catch(next);
};
