const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, 
    methods: ['GET', 'POST'],
  },
});

app.use('/', express.static(`${__dirname}/src/view/`));

require('./src/sockets/messages.js')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/view/index.html`);
});

http.listen(PORT, () => console.log(PORT));