const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));

require('./sockets/webchat')(io);

app.get('/', (req, res) => res.render('webchat'));

http.listen(PORT, () => {
  console.log(`Servidor  ouvindo na porta ${PORT}`);
});
