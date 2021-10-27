const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const user = {
};
const usersLogados = [];

app.use(cors(
  {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  },
));
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const nameAleatorio = socket.id.slice(0, 16);
  usersLogados.push(nameAleatorio);
  console.log('usersLogados :', usersLogados);

  io.emit('nomeAleatorio', usersLogados);
  socket.on('salveUser', (name) => {
    user.name = name;
  });
  socket.on('salveMessage', (message) => {
    /* https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
    https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript */
    const d = new Date();
    const data = d.toISOString().substr(0, 10).split('-').reverse()
    .join('-');
    const horas = d.toLocaleTimeString();

    user.data = `${data} ${horas}`;
    user.message = message;
    console.log('message back :', user);
    io.emit('receivedMessage', user);
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_req, res) => res.render('Chat'));

server.listen(PORT, () => console.log(`O pai tá on na porta ${PORT}`));