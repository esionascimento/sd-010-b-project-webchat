// Faça seu código aqui
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

const chatController = require('./controllers/chatController');

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

require('./sockets/chat')(io);

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', chatController.getMessages);

app.post('/', chatController.saveMessage);

// a porta precisa ser escutada constantemente para identificar uma requisição
http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});