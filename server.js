const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

// socket
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

  require('./sockets/chat')(io);
  require('./sockets/message')(io);
  
// controllers
const chatController = require('./controllers/chatController');

// configurações
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './views');

// rotas
app.get('/', chatController.inialPage);

http.listen(3000, () => console.log('servidor rodando na porta 3000'));