const moment = require('moment');
const express = require('express');
const path = require('path');
const { createServer } = require('http');

const PORT = 3000;
const app = express();
const httpServer = createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const connection = require('./models/connection');

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  const messages = await connection().then((db) =>
    db.collection('messages').find({}).toArray());

  const onlineUsers = await connection().then((db) =>
    db.collection('users').find({}, { _id: 0 }).toArray());

  res.render('webChat', { messages, onlineUsers });
});

const addUser = async (_id, nickname) => {
  await connection().then((db) =>
    db.collection('users').insertOne({ _id, nickname }));
};

const addMessage = async (nickname, chatMessage) => {
  const newMessage = {
    message: chatMessage,
    nickname,
    timestamp: moment(new Date()).format('DD-MM-yyyy HH:mm:ss'),
  };

  await connection().then((db) =>
    db.collection('messages').insertOne(newMessage));

  io.emit(
    'message',
    `${newMessage.timestamp} - ${newMessage.nickname}: ${newMessage.message}`,
  );
};

const newNickname = async (oldNickname, nickname) => {
  await connection().then((db) =>
    db
      .collection('users')
      .updateOne({ nickname: oldNickname }, { $set: { nickname } }));
};

const generateRandomString = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i += 1) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result1;
};

io.on('connection', async (socket) => {
  const randomUser = generateRandomString(16);
  await addUser(socket.id, randomUser);
  socket.emit('setUser', randomUser);

  socket.on('message', async ({ nickname, chatMessage }) => {
    await addMessage(nickname, chatMessage);
  });

  socket.on('setNewNickname', async ({ oldNickname, nickname }) => {
    await newNickname(oldNickname, nickname);
  });

  socket.on('disconnect', async () => {
    await connection().then((db) =>
      db.collection('users').deleteOne({ _id: socket.id }));
  });
});

httpServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
