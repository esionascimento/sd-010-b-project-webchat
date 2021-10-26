require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env || 3000;

const app = express();
const http = require('http').createServer(app);
const path = require('path');

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(cors());

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/chat.html'));
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});