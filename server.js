require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
const socketIoServer = require('http').createServer(app);

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

socketIoServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
 });

const { getDate } = require('./utils/getDate');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataDb = { messages: [] };

io.on('connection', (socket) => {
  io.emit('setIdNickname');
  socket.on('message', (data) => {
    const { chatMessage, nickname } = data;
    const date = getDate();
    dataDb.messages.push({ chatMessage, nickname, date });
    const completeMessage = `${date} - ${nickname}: ${chatMessage}`;
    io.emit('message', completeMessage);
  });
});

app.get('/', (req, res) => res.status(200).render('chat', { dataDb }));

// app.post('/', (req, res) => {
//   const { chatMessage } = req.body;
//   if (!chatMessage) {
//     return res.status(422).json({ message: 'Missing title or message' });
//   }
//   // dataDb.messages.push(message);
//   console.log('chatMessage');
//   // io.emit('message', { message });
//   return res.status(200).json({ message: 'Message sent' });
// });
