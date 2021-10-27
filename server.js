const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);

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
  socket.on('message', (mensageUser) => {
    console.log(mensageUser.nickname);
    const { chatMessage, nickname } = mensageUser;
    const messa = `${date()} ${hors()} - ${nickname}: ${chatMessage}`;
    io.emit('message', messa);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});