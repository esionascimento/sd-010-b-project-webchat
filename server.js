const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;
const userList = [];

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

app.use(express.static(`${__dirname}/views`));

io.on('connection', (socket) => { // agradecimentos Lucas Martins da Silva PR: https://github.com/tryber/sd-010-b-project-webchat/pull/14
  socket.on('message', ({ chatMessage, nickname }) => {
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });

  socket.on('userConnected', (nickname) => {
    userList.push({ nickname, id: socket.id });
    io.emit('updateUserList', userList);
  });

  socket.on('nickUpdate', ({ nickname, oldNick }) => {
    const oldNickIndex = userList.findIndex((e) => e.nickname === oldNick);
    userList.splice(oldNickIndex, 1, { nickname, id: socket.id });
    io.emit('updateUserList', userList);
  });

  socket.on('disconnect', ({ id }) => {
    const index = userList.findIndex((user) => user.id === id);
    userList.splice(index, 1); 
    io.emit('updateUserList', userList);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});