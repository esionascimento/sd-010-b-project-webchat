require('dotenv').config();

const express = require('express');
const cors = require('cors');
const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization'],
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (req, res) => {
  res.status(200).render('view');
});

io.on('connection', (socket) => {
  console.log('Connected user');
  socket.on('disconnect', () => {
    console.log('Disconnected user');
  });
  socket.on('input message', (msg) => {
    console.log(`Message: ${msg}`);
  });
});

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});

server.listen(4000);