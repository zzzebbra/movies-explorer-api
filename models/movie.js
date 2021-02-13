const mongoose = require('mongoose');
const validator = require('validator');
const user = require('./user');

// eslint-disable-next-line no-useless-escape
const regex = /(https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?)/gi;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return url.match(regex);
      },
      message: 'Ссылка может содержать цифры, латинские буквы и спецсимволы. Пожалуйста, проверьте ссылку.',
    }
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return url.match(regex);
      },
      message: 'Ссылка может содержать цифры, латинские буквы и спецсимволы. Пожалуйста, проверьте ссылку.',
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return url.match(regex);
      },
      message: 'Ссылка может содержать цифры, латинские буквы и спецсимволы. Пожалуйста, проверьте ссылку.',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true,
  },
  movieId: {
    // придумать, что тут должно быть
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('movie', movieSchema)
