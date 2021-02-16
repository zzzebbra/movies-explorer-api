const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, Joi, celebrate } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const routes = require('./routes/index.js');

const { createUser, login } = require('./controllers/users');

const auth = require('./middlewares/auth');

// const corsOptions = {
//   origin: [
//     'http://localhost:3000', 'http://localhost:3001',

//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// };

mongoose.connect('mongodb://localhost:27017/movies_explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

const app = express();

//app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(8).required(),
  })
}), createUser)

app.use(auth);

app.use(routes);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate


app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? `На сервере произошла ошибка ${err}`
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Alive at port:', PORT);
});
