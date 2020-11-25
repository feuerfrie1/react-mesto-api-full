/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
const validator = require('validator');

const validatorOptions = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_valid_protocol: true,
};
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link, validatorOptions);
      },
      message: 'Ссылка введена неверно',
    },
    required: true,
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
    minlength: 2,
    maxlength: 500,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Почта или пароль введены неверно!'));
      }
      return bcript.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Почта или пароль введены неверно!'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
