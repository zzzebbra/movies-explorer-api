/* eslint-disable max-len */
const router = require('express').Router();
const { NotFoundError } = require('../middlewares/errors');

router.all('/*', (req, res) => {
  if (res.status(404)) {
    throw new NotFoundError('Запрашиваемый ресурс не найден');
  }
});

module.exports = router;
