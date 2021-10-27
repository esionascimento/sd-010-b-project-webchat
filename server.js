const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    method: ['*'],
  },
});

const { getMessages,
  insertMessage } = require('./models/usersModel');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './view');

let newUsers = [];

const mensagem = async (message) => {
  const { chatMessage, nickname } = message;
  const date = new Date().toLocaleString().replace(/\//g, '-');
  await insertMessage(chatMessage, nickname, date);
  io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
};

const edited = (nickEdited, socket) => {
  const edit = newUsers.map((user) => {
    if (user.id === socket.id) return { nick: nickEdited, id: socket.id };
    return user;
  });
  newUsers = edit;
  const onlyStrings = newUsers.map((users) => users.nick);
  io.emit('onlineUsers', onlyStrings);
};

  const login = (n, socket) => {
    const user = { nick: n, id: socket.id };
    newUsers.push(user);
    const onlyStrings = newUsers.map((users) => users.nick);
    io.emit('onlineUsers', onlyStrings);
  };

io.on('connection', (socket) => {
  // let nick = '';
  console.log('fulano entrou');
  socket.on('message', (message) => {
    mensagem(message);
  });

  socket.on('logedNick', (n) => {
    login(n, socket);
  });
  
  socket.on('nickEdtion', (nickEdited) => {
    edited(nickEdited, socket);
  });

  socket.on('disconnect', () => {
    console.log('fulano vazou');
    const diconected = newUsers.filter((users) => users.id !== socket.id);
    newUsers = diconected;
    const onlyStrings = newUsers.map((users) => users.nick);
    io.emit('onlineUsers', onlyStrings);
  });
});

app.get('/', (_req, res) => {
  res.status(200).render('index');
});

app.get('/messages', async (_req, res) => {
  const messagesDb = await getMessages();
  res.status(200).json(messagesDb);
});

http.listen(3000, () => console.log('Sever on 3000'));
