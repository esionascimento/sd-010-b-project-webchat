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
};

const changeNickname = (socket, originalNickname, nickname) => {
  socketsUsers[socket.id] = nickname;
  const index = users.indexOf(originalNickname);
  if (index >= 0) users[index] = nickname;
  if (index < 0) users.push(originalNickname);
};

const mapMessages = async () => {
  const objectMessages = await getAll();
  const messages = objectMessages.map((object) => `${object.nickname
    } - ${object.timestamp}: ${object.message}`);
  return messages;
};

io.on('connection', async (socket) => {
  const messages = await mapMessages();
  socket.emit('messageHistory', messages);
  socket.emit('userHistory', users);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = getDateTime();

    await insertOne(chatMessage, timestamp, nickname);
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNickname', ({ originalNickname, nickname }) => {
    changeNickname(socket, originalNickname, nickname);
    io.emit('changeNickname', users);
  });

  socket.on('disconnect', (reason) => {
    console.log(reason);
    if (reason === 'transport_error') console.log('Transport error');
    removeUser(socket);
    io.emit('changeNickname', users);
  });
});

app.get('/', async (_req, res) => {
  res.status(200).render('index');
});

http.listen(3000, () => {
  console.log('Escutando na porta 3000...');
});