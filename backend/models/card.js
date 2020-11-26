/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
const validator = require('validator');

const validatorOptions = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_valid_protocol: true,
};

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link, validatorOptions);
      },
      message: 'Ссылка введена неверно',
    },
    required: true,
  },
  owner: {
    type: Object,
    required: true,
    ref: 'user',
  },
  likes: {
    type: Object,
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
