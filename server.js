require('dotenv').config();
const express = require('express');

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

const userController = require('./controllers/userController');

app.use(express.static(`${__dirname}/views`));

app.get('/', (_req, res) => {
  res.render(`${__dirname}/views`);
});

let users = [];

io.on('connection', async (socket) => {
  socket.on('loggedUser', async ({ nickname }) => { 
    users = users.filter(({ id }) => id !== socket.id);
    users.push({ nickname, id: socket.id });
    io.emit('loggedUser', users);
    return users;
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    userController.createMessages({ dateNow, nickname, chatMessage });
    io.emit('message', `${dateNow} ${nickname} ${chatMessage}`);
  });

  const messages = await userController.getAllMessages();
  socket.emit('allMessages', messages);

  socket.on('disconnect', () => {
    users = users.filter(({ id }) => id !== socket.id);
    io.emit('loggedUser', users);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});