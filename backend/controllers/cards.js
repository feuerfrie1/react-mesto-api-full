const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => next(new BadRequestError('С запросом что-то не так')));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(() => next(new BadRequestError('С запросом что-то не так')));
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Card.findById(id)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(id).then(() => res.status(200).send(card));
      } else {
        throw new ForbiddenError('Нельзя удалять чужую карточку');
      }
    }).catch(next);
};
