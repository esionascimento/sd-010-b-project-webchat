// Faça seu código aqui// Faça seu código aqui
require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const http = require('http').createServer(app);

const io = require('socket.io')(http, { 
  cors: { 
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});

const chatController = require('./controllers/chatController');
const chat = require('./sockets/chat');

chat(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', chatController.getChat);

app.listen(PORT, () => console.log(`Listening on ${PORT}!`)); 