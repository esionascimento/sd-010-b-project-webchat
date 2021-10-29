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
  console.log(onlineUsers);
  res.render('webChat', { messages, onlineUsers });
});

io.on('connection', async (socket) => {
  await connection().then((db) =>
    db.collection('users').insertOne({ nickname: socket.id }));

  socket.on('message', async ({ nickname, chatMessage }) => {
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
  });

  socket.on('setNewNickname', async ({ oldNickname, nickname }) => {
    await connection().then((db) =>
      db
        .collection('users')
        .updateOne({ nickname: oldNickname }, { $set: { nickname } }));
  });

  socket.emit('setUser', socket.id);
});

httpServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
