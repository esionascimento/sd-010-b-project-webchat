const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

let message = [];

const formattedDate = () => {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const fullHour = `${date.getHours()}:${date.getMinutes()}`;
  const pmOrAm = fullHour < 12 ? 'AM' : 'PM';
  return `${currentDate} ${fullHour} ${pmOrAm}`;
};

app.use(cors());
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id}`);

  socket.on('message', (data) => {
    message = `${formattedDate()} - ${data.nickname}: ${data.chatMessage}`;
    io.emit('message', message);
  });
  // socket.on('randomNick', (data) => {
  //   message = `${formattedDate()} - ${data.nickname}: ${data.chatMessage}`;
  //   io.emit('randomNick', message);
  // });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', (_req, res) => {
  res.render('webchat', { message });
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
