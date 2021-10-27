const express = require('express');
const path = require('path');

const app = express();

const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));

io.on('connection', (socket) => {
  socket.on('message', (payload) => {
    const { chatMessage, nickname } = payload;
    const dateAndHour = new Date().toLocaleString().replace(/\//g, '-');
    const sendMensage = `$ ${dateAndHour} - ${nickname} -  ${chatMessage}`;
  io.emit('message', sendMensage);
  });
  console.log(`Usuário conectado ${socket.id}`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
