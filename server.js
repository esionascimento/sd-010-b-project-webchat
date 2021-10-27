const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));
let conectedUsers = [];

io.on('connection', (socket) => {
  io.emit('idConnect', socket.id);
  socket.on('SendMessage', (payload) => {
    const { chatMessage, nickName } = payload;

    const dateAndHour = new Date().toLocaleString().replace(/\//g, '-');
    const sendMensage = `$ ${dateAndHour} - ${nickName} -  ${chatMessage}`;
    io.emit('ReciveMessage', sendMensage);
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

app.get('/', (req, res) => {
   res.render(path.join(__dirname, 'views', 'index.ejs'));
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
