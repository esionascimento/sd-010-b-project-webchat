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

const dataDb = { messages: ['09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!',
'09-10-2024 2:35:09 PM - Paulin: CATAPIMBAS! CADÊ MEU CAFÉ?'],
users: ['Joel', 'Paulin', 'DEUS'] };

io.on('connection', (socket) => {
  // console.log(`${socket.id} conectado`);
  socket.on('message', (data) => {
    const { chatMessage, nickname } = data;
    const completeMessage = `${getDate()} - ${nickname}: ${chatMessage}`;
    dataDb.messages.push(completeMessage);
    const datetime = new Date();
    console.log(datetime.toISOString().slice(0, 10));
    io.emit('message', completeMessage);
  });
});

// app.listen(PORT, () => {
//   console.log(`App listening onx port ${PORT}`);
// });

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

socketIoServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
 });