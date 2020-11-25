const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const authRouter = require('./routes/authRouter');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const { PORT = 3000 } = process.env;
const app = express();
app.use(cors({ origin: true }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', authRouter);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorLogger);
app.use(errors());

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  if (name === 'ValidationError' || statusCode === 400) return res.status(400).send({ message: 'Переданы некорректные данные' });
  return res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
