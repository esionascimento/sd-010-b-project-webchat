const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });
});

// app.use(express.static(`${__dirname}/public`)); // fornece permissão para arquivo externo

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});