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

const msgController = require('./controllers/messages');

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

app.get('/messages', async (req, res) => {
  const allMsgs = await msgController.getAllMsg();
  res.status(200).json(allMsgs);
});

app.use(express.static(`${__dirname}/views`));
const dateNow = new Date().toLocaleString().replace(/\//g, '-');

io.on('connection', (socket) => { // agradecimentos Lucas Martins da Silva PR: https://github.com/tryber/sd-010-b-project-webchat/pull/14
  socket.on('message', async ({ chatMessage, nickname }) => {
    await msgController.createMsg(chatMessage, nickname, dateNow);
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });

  socket.on('userConnected', (nickname) => {
    userList.push({ nickname, id: socket.id });
    io.emit('updateUserList', userList);
  });

  socket.on('nickUpdate', ({ nickname, oldNick }) => {
    const index = userList.findIndex((i) => i.nickname === oldNick);
    userList.splice(index, 1, { nickname, id: socket.id });
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