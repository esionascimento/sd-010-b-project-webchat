// Faça seu código aqui
require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const http = require('http').createServer(app);

const io = require('socket.io')(http, { 
  cors: { 
    origin: 'http://localhost:3000', 
    methods: ['GET,POST'],
  },
});

const chatController = require('./controllers/chatController');

io.on('connection', (socket) => {
  console.log('user connected', socket.id);

  socket.on('disconnect', () => {
      console.log('user disconnect', socket.id);
  });
  socket.on('message', (message) => {
    io.emit('message', message);
  });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', chatController.getChat);

app.listen(port, () => console.log(`Listening on ${port}!`));