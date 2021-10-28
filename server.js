const express = require('express');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));

app.get('/', (req, res) => {
  res.render(`${__dirname}/views`);
});

let allUsers = []; 

io.on('connection', (socket) => {
  socket.on('userOn', ({ nickname }) => { 
    allUsers = allUsers.filter(({ id }) => id !== socket.id);
    allUsers.push({ nickname, id: socket.id }); io.emit('userOn', allUsers);
    return allUsers;
  });

  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });

// socket.on('newNick', ({ nick }) => {
//   allUsers = allUsers.map((user) => {
//  if (user.id === socket.id) { return { nick, id: socket.id }; } return user; 
// });
// });

  socket.on('disconnect', () => {
  allUsers = allUsers.filter(({ id }) => id !== socket.id);
  io.emit('userOn', allUsers);
});
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Agradecimento ao Lucas Martins