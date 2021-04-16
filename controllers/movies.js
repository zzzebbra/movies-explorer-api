const Movie = require('../models/movie');

const { NotFoundError, ForbiddenError } = require('../middlewares/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner,
    movieId,
  })
    .then((movie) => {
      res.send({ data: { movie } });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie == null) { throw new NotFoundError('Фильм не существует'); }
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.send({ data: movie }));
      } else {
        throw new ForbiddenError('Невозможо удалить чужой фильм');
      }
    })
  // else {
  //   Movie.findByIdAndRemove(req.params.movieId)
  //     .then(() => res.send({ data: movie }));
  // }
    .catch(next);
};
