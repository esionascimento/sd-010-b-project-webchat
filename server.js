const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const chatController = require('./controllers/chatController');

app.use(express.static(__dirname));

require('./sockets/chat')(io);

 app.get('/chat', chatController.chat);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));