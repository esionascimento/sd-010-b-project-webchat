const express = require('express');

const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    method: ['*'],
  },
});

// const { getUsers, insertUser, deleteUser } = require('./models/usersModel');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', './view');

// MOMENT

io.on('connection', (socket) => {


  let nick = '';
  const onlineUsers = [];

  console.log('alguem entrou');
  console.log(onlineUsers);
  socket.on('message', async ({ message }) => { 
    const { chatMessage, nickname } = message;
    const date = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  });

  socket.on('logedNick', (n) => { 
    nick = n;
    onlineUsers.push(nick);
    io.emit('loggedUsers', onlineUsers);
  });
});

app.get('/', (_req, res) => {
  res.status(200).render('index', { message: 'oi daniel' });
});

http.listen(3000, () => console.log('Sever on 3000'));
