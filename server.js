const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

app.get('/messages', async());

app.use(express.static(`${__dirname}/views`));

let conectedUsers = [];

io.on('connection', (socket) => {
  io.emit('idConnect', socket.id);
  socket.on('message', (payload) => {
    const { chatMessage, nickname } = payload;
    const dateAndHour = new Date().toLocaleString().replace(/\//g, '-');
    const sendMensage = `${dateAndHour} - ${nickname} ${chatMessage}`;
    io.emit('message', sendMensage);
  });

  socket.on('UserOnline', (conectUser) => {
    conectedUsers = [[...conectUser[0], socket.id], ...conectedUsers]
      .filter((e) => e[0] !== conectUser[1]);
    io.emit('allUsers', conectedUsers);
  });

  socket.on('disconnect', () => {
    conectedUsers = conectedUsers.filter(([, id]) => id !== socket.id);
    io.emit('allUsers', conectedUsers);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
