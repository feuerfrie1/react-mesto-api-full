const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .orFail({ message: 'С запросом что-то не так', statusCode: 400 })
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
  Card.findOne({ _id: req.params.id })
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (String(card.owner) !== owner) throw new ForbiddenError('Недостаточно прав');
      return Card.findByIdAndDelete(card._id);
    })
    .then((success) => res.send(success))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findOneAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findOneAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};
