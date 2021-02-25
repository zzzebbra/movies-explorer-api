/* eslint-disable max-len */
const router = require('express').Router();
const { NotFoundError } = require('../middlewares/errors');

router.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
