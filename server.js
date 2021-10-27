// Faça seu código aqui

const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

app.use(cors());
app.use(express.json());

const formatMessage = require('./util/formatMessage');
const getTheCurrentDate = require('./util/getTheCurrentDate');

app.get('/', (req, res) => {
  res.status(200).render('client');
});

const allcustomerMessages = [];
const UsersOn = [];

io.on('connection', (socket) => {
  console.log(`${socket.id} usuario conectado`);
  
  // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
    socket.on('newUser', (user) => {
      console.log(user);
      io.emit('newUser', user);
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
    // persistência de usuário 
    UsersOn.push({ nickname, idSocket: socket.id });

    // persistência de mensagem
    allcustomerMessages.push({ idSocket: socket.id, nickname, chatMessage });
    
    const date = getTheCurrentDate();
    const fullMessage = formatMessage(date, chatMessage, nickname);
    io.emit('message', fullMessage);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});