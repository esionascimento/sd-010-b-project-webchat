const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

io.on('connection', (socket) => { // agradecimentos Lucas Martins da Silva PR: https://github.com/tryber/sd-010-b-project-webchat/pull/14
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const now = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${now} - ${nickname} ${chatMessage}`);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});