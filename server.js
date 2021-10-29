const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;
// const messages = [];

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

const messageController = require('./controllers/messageController');
const messageModel = require('./models/messageModel');
  
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', messageController.listMessages);
let usersOn = [];

io.on('connection', async (socket) => {
  // console.log(socket.id);
  socket.on('message', async (post) => {
    const { nickname, chatMessage } = post;
    const data = moment().format('DD-MM-yyyy HH:mm:ss A');
    const message = `${data} - ${nickname}: ${chatMessage}`;
    await messageModel.insertMessage(chatMessage, nickname, data);
    io.emit('message', message);
  });
  
  socket.on('userOn', (user) => {
    usersOn = usersOn.filter((id) => socket.id !== id.id);
    usersOn.push({ id: socket.id, user });
    io.emit('usersOn', usersOn);
  });

  socket.on('disconnect', () => {
    usersOn = usersOn.filter((id) => socket.id !== id.id);
    io.emit('usersOn', usersOn);
  });
});

http.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});