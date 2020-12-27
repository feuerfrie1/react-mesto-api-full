/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');

const validatorOptions = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_valid_protocol: true,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        return validator.isURL(link, validatorOptions);
      },
      message: 'Ссылка введена неверно',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введите корректный email!',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 500,
    select: false,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  return bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Почта или пароль введены неверно!'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Почта или пароль введены неверно!'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
