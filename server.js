const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    method: ['*'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  // console.log('Alguém conectou');

  // socket.on('disconnect', () => console.log('Fulano saiu'));

  socket.on('message', (message) => { 
    const { chatMessage, nickname } = message;
    const date = new Date().toLocaleString().replace(/\//g, '-');
    // agradecido pela ajuda do Lucas Martins no date
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  // socket.emit('message', ('Olá, seja bem vindo(a) ao chat!'));

  // socket.broadcast.emit('severMessage', { message: 'Novo fulano entrou' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

http.listen(3000, () => console.log('Sever on 3000'));