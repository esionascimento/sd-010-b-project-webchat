const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
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

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});