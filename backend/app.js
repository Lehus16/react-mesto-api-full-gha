/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const centralizedErrorHandler = require('./middlewares.js/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares.js/logger');
const cors = require('./middlewares.js/corsHandler');
const router = require('./routes/index');
const NotFoundError = require('./errors/notFound');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb', NODE_ENV } = process.env;

const app = express();
// Подключаем CORS
app.use(cors);

app.use(express.json());
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Обработчик роутов
app.use(router);
app.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

// Логгер ошибок
app.use(errorLogger);

app.use(errors());
// Централизованный обработчик ошибок
app.use(centralizedErrorHandler);

async function init() {
  await mongoose.connect(MONGO_URL);
  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT} ${NODE_ENV}`);
}

init();
