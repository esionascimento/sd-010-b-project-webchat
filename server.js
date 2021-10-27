const express = require('express');
const path = require('path');

const app = express();
const htttp = require('http').createServer(app);

const io = require('socket.io')(htttp, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

htttp.listen(3000, () => {
  console.log('Listening port 3000');
});
