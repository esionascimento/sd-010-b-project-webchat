const express = require('express');
require('dotenv').config();

const { PORT } = process.env;

const app = express();
app.use(express.static(`${__dirname}/src`));
app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/src/views/chat.html`);
});

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http//localhost:3000',
    methods: ['GET', 'POST'], 
  },
});
require('./src/sockets/chat')(io);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/src/views/chat.html`);
});

http.listen(PORT, () => {
  console.log(`Server on: port ${PORT}`);
});
