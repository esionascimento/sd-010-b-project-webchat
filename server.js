const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const conn = require('./sockets/chat');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server);

app.set('view engine', 'ejs');
app.set('views', './views');

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

conn(io);

server.listen(3000, () => {
  console.log('server running on port 3000');
});
