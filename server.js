const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// const messages = [];
const users = [];
const socketsUsers = {};

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(cors());

// Baseado em: https://stackoverflow.com/questions/60240603/nodejs-mime-type-text-html-is-not-a-supported-stylesheet-mime-type
app.use('/css', express.static(`${__dirname}/views/css`));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const { getDateTime } = require('./utils/dateTime');
const { getAll, insertOne } = require('./models/messages');

const removeUser = (socket) => {
  const nickname = socketsUsers[socket.id];
  const index = users.indexOf(nickname);
  users.splice(index, 1);
  return users;
};

const changeNickname = (socket, originalNickname, nickname) => {
  socketsUsers[socket.id] = nickname;
  const index = users.indexOf(originalNickname);
  if (index >= 0) users[index] = nickname;
  if (index < 0) users.push(originalNickname);
  return users;
};

const mapMessages = async () => {
  const objectMessages = await getAll();
  return objectMessages.map((object) => `${object.timestamp
    } - ${object.nickname}: ${object.message}`);
};

io.on('connection', async (socket) => {
  const messages = await mapMessages();
  socket.emit('messageHistory', messages);
  socket.emit('userHistory', users);

  socket.on('message', ({ chatMessage, nickname }) => {
    insertOne(chatMessage, getDateTime(), nickname);
    io.emit('message', `${getDateTime()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNickname', ({ originalNickname, nickname }) => {
    io.emit('changeNickname', changeNickname(socket, originalNickname, nickname));
  });

  socket.on('disconnect', () => {
    io.emit('changeNickname', removeUser(socket));
  });
});

app.get('/', async (_req, res) => {
  res.status(200).render('index');
});

http.listen(3000, () => {
  console.log('Escutando na porta 3000...');
});