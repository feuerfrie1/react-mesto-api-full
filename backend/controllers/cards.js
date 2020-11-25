const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch ((err) => {
      if (err.name === "ValidationError") {
         res.status(400).send({ message: "Переданы некорректные данные" });
       } else {
         res.status(500).send({ message: "Ошибка сервера" });
       }
  });
};

module.exports.getAllCards = (_req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточки нет в базе' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
