const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcript.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ _id: user._id, email }))
    .catch((err) => next(new ConflictDataError(err)));
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
