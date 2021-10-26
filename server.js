const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  io.emit('serverMessage', { message: `User ID ${socket.id} conectado.` });

  socket.on('disconnect', () => {
    io.emit('serverMessage', { message: `User ID ${socket.id} desconectado.` });
  });

  socket.on('mensagem', (msg) => {
    io.emit('serverMessage', { message: `${socket.id}: ${msg}` });
  });

  socket.emit('message', (`Seja bem vindo ${socket.id}.`));
  socket.broadcast.emit('serverMessage', { message: 'Novo user conectado.' });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});