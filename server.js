require('dotenv').config();
const express = require('express');
const http = require('http');
const moment = require('moment');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));

app.get('/', (_req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

io.on('connection', (socket) => {
  socket.on('message', ({
    chatMessage,
    nickname,
  }) => {
    const today = new Date().toLocaleString().replace(/\//g, '-');
    const test = moment().format();
    console.log(test);
    io.emit('message', `${today} - ${nickname}: ${chatMessage}`);
  });
});

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));