// Faça seu código aqui
const express = require('express');
const cors = require('cors');
const moment = require('moment');
const ramdomNickname = require('randomstring');

const app = express();
app.use(cors());
app.use(express.static(`${__dirname}/public`));
const server = require('http').createServer(app);

const io = require('socket.io')(server, {  
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

  const users = [];

  io.on('connection', (socket) => {    
    const randomNick = ramdomNickname.generate(16);
    users.push(randomNick);
    io.emit('welcome', randomNick);
    
    const timestamp = moment().format('DD-MM-yyyy HH:mm:ss A');
    console.log(`user conected ${socket.id} - nickName ${users}`);    
    
    socket.on('message', (data) => {
      // const completeMessage = `${timestamp} - ${nickname}: ${data.chatMessage}`;
      io.emit('message', `${timestamp} - ${randomNick}: ${data.chatMessage}`);
      // console.log(completeMessage);      
    });
    socket.on('disconnect', () => {
      io.emit('welcome', 'A user has left the room');
    });
  });
    
  app.get('/', (_req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });
  
  server.listen(3000, () => {
    console.log('listening on port: 3000');
  });