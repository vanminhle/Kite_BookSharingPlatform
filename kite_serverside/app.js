const express = require('express');
const morgan = require('morgan');

//call express
const app = express();

//middleware checking route status
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//testing route api
app.get('/', (req, res) => {
  res.status(200).send('HELLO BACKEND! TESTING BRANCH');
});

module.exports = app;
