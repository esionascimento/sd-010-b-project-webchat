// Faça seu código aqui
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  
const { renderChat } = require('./controllers/clientController');

app.use(cors());
app.use(express.json());

const allMessage = [];
console.log(allMessage);

const newDataHora = require('./utils/getDate');
const chat = require('./utils/format');

io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    socket.on('message', ({ chatMessage, nickname }) => {
      const date = newDataHora();
      const message = chat(chatMessage, nickname, date);
      allMessage.push({ chatMessage, nickname }, date);
      io.emit('message', message);
    });

    socket.on('initialNick', (nickRender) => {
      console.log(socket.id);
      io.emit('initialNick', { nickRender, id: socket.id }); 
    });
});

app.get('/', renderChat);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
