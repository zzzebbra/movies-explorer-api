const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/(https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?)/),
    trailer: Joi.string().required().pattern(/(https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?)/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/(https?:\/\/[www]?[a-z\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=0-9]*#?)/),
  })
}), createMovie);

moviesRouter.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).required().hex(),
  }),
}), deleteMovie);

module.exports = moviesRouter;
