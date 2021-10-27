const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.render(`${__dirname}/views`);
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Agradecimento ao Lucas Martins