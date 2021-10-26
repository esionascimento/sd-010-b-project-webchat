// setting up application like Doc: https://socket.io/get-started/chat#the-web-framework
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const ChatController = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', ChatController.chat);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
