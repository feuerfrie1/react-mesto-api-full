const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictDataError = require('../errors/conflict-data-err');
const LoginError = require('../errors/login-err');
const NotFoundError = require('../errors/not-found-err');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .orFail({ message: 'С запросом что-то не так', statusCode: 400 })
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .then((user) => {
      if (user) {
        res.send(user);
      }
    })
    .catch((err) => {
      throw new NotFoundError({ message: `Пользователь с идентификатором ${err.message} не найден` });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      throw new ConflictDataError({ message: `Запрос некорректен:${err.message}` });
    })
    .catch(next);
};

module.exports.patchProfileInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.patchProfileAvatar = (req, res, next) => {
  const { link } = req.body;
  User.findOneAndUpdate({ _id: req.user._id }, { avatar: link }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Нет пользователя с таким id'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => next(new LoginError(err.message)));
};
