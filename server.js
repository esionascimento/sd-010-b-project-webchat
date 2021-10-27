const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const { getDate } = require('./utils/chatFuctions');

/* require('./sockets/chat')(io); */

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.get('/', (_req, res) => {
  res.render('index.html');
});

io.on('connection', (socket) => {
  console.log(`Novo usuário conectado: ${socket.id}`);
  socket.on('message', (message) => {
    const date = getDate();
    const newMessage = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', newMessage);
  });
});

http.listen(port, () => console.log(`Example app listening on ${port}!`));