const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const messages = [];
const users = [];

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

io.on('connection', (socket) => {
  socket.emit('messageHistory', messages);
  socket.emit('userHistory', users);

  socket.on('message', ({ chatMessage, nickname }) => {
    const currentDate = new Date(); 
    const date = `${currentDate.getDate()}-${
      (currentDate.getMonth() + 1)}-${currentDate.getFullYear()}`;
    
    const time = `${currentDate.getHours()}:${
      (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()}`;

    messages.push(`${date} ${time} - ${nickname}: ${chatMessage}`);
    io.emit('message', `${date} ${time} - ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNickname', ({ nickname }) => {
    users.push(nickname);
    io.emit('changeNickname', users);
  });
});

app.get('/', async (_req, res) => {
  res.status(200).render('index');
});

http.listen(3000, () => {
  console.log('Escutando na porta 3000...');
});