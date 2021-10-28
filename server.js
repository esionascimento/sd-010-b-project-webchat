const moment = require('moment');
const express = require('express');
const path = require('path');
const { createServer } = require('http');

const PORT = 3000;
const app = express();
const httpServer = createServer(app);

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const generateRandomString = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i += 1) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result1;
};

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.render('webChat');
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('message', (message) => {
    io.emit(
      'message',
      `${moment(new Date()).format('DD-MM-yyyy HH:mm:ss')} - ${
        message.nickname
      }: ${message.chatMessage}`,
    );
  });

  socket.emit('setUser', generateRandomString(16));
});

httpServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
