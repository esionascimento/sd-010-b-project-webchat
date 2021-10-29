const express = require('express');
const chatRouter = require('../controllers/routes');

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(chatRouter);

app.get('/', (req, res) => {
  res.status(200).send('ok');
});

module.exports = app;