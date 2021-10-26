const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${process.env.PORT}`,
    method: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const now = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${now} - ${nickname} ${chatMessage}`);
  });
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(process.env.PORT, () => {
  console.log(`Servidor ouvindo na porta ${process.env.PORT}`);
});