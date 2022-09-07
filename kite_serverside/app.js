const express = require('express');
const morgan = require('morgan');
//const cors = require('cors');
const cookieParser = require('cookie-parser');

// const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const tagRouter = require('./routes/tagRoutes');
const bookRouter = require('./routes/bookRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//critital middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Add headers before the routes are defined
//app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.CLIENT_URL_DEVELOPMENT
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
app.use(express.json());
app.use(cookieParser());

//ROUTES

app.use('/http/api/users', userRouter);
app.use('/http/api/tags', tagRouter);
app.use('/http/api/books', bookRouter);
app.use('/http/api/transactions', transactionRouter);
app.use('/http/api/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
