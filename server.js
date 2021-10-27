const express = require('express');
// const path = require('path');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
  } });

  // io.on('connection', (socket) => {
  //   console.log(`Usuário conectado. ID: ${socket.id} `);
  //   io.emit('conn', socket.id);
  // });

  // app.use(express.static(path.join(__dirname, '/public')));

  app.set('view engine', 'ejs');

  app.set('views', './views');

  require('./sockets/chat')(io);

  app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public/index.html'));
    res.render('index');
  });

  http.listen(3000, () => {
    console.log('Servidor ouvindo na porta 3000');
  });
