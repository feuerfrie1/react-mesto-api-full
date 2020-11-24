/* eslint-disable no-unused-expressions */
const mongoose = require('mongoose');
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
      validator(str) {
        const regExp = /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/;
        return regExp.test(str);
      },
      message: 'Ссылка введена неверно',
    },
    required: true,
  },
  owner: {
    type: Object,
    required: true,
  },
  likes: {
    type: Object,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
