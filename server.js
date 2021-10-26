const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
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

http.listen(PORT, () => {
  console.log('Servidor ouvindo na porta 3000');
});