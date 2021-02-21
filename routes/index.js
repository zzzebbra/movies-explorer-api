const router = require('express').Router();

const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const notFoundRouter = require('./not-found.js');

router.use(
  usersRouter,
  moviesRouter,
  notFoundRouter,
);

module.exports = router;
