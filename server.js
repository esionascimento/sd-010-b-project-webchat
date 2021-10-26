// setting up application like Doc: https://socket.io/get-started/chat#the-web-framework
const express = require('express');

const app = express();
const http = require('http');
const ChatController = require('./controllers/chatController');

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', ChatController.chat);

server.listen(3000, () => {
  console.log('listening on *:3000');
});
