const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views')); 
const htttp = require('http').createServer(app);

const io = require('socket.io')(htttp, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, '/public')));

require('./sockets/chat')(io);

app.get('/', (_req, res) => {
  res.status(200).render('chat');
});

htttp.listen(3000, () => {
  console.log('Listening port 3000');
});
