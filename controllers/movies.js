const Movie = require('../models/movie');

const { NotFoundError } = require('../middlewares/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => {
      res.send({ data: { movie } });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie == null) { throw new NotFoundError('Фильм не существует'); } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({ data: movie }));
      }
    })
    .catch(next);
};
