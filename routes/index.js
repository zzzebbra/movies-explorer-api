const router = require('express').Router();

const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const notFoundRouter = require('./not-found.js');
const errorRouter = require('./errors');

router.use(
  usersRouter,
  moviesRouter,
  notFoundRouter,
  errorRouter,
);

module.exports = router;
