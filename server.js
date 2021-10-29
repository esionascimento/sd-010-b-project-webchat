const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost${3000}`,
    methods: ['GET', 'POST'],
  },
});

const { addMessage } = require('./src/models/controllerMessages');

const date = () => {
  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
};

const hors = () => {
  const data = new Date();
  const hora = data.getHours();
  const minutos = data.getMinutes();
  const segundos = data.getSeconds();
  return `${hora}:${minutos}:${segundos}`;
};

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
  });
io.on('connection', (socket) => {
  socket.on('message', async (mensageUser) => {
    console.log(mensageUser.nickname);

    const { chatMessage, nickname } = mensageUser;

    const now = `${date()} ${hors()}`;

    const userMessage = `${now} - ${nickname}: ${chatMessage}`;
    await addMessage(chatMessage, nickname, now);
    io.emit('message', userMessage);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});