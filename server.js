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

const { createMessage, getAllMessages } = require('./controllers/chatController');

app.use(express.static(`${__dirname}/views`));

app.get('/', (req, res) => {
  res.render(`${__dirname}/views`);
});

let allUsers = []; 

io.on('connection', async (socket) => {
  socket.on('userOn', async ({ nickname }) => { 
    allUsers = allUsers.filter(({ id }) => id !== socket.id);
    allUsers.push({ nickname, id: socket.id }); io.emit('userOn', allUsers);
    return allUsers;
  });

  socket.on('message', async (message) => {
    const { chatMessage, nickname } = message;
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    createMessage({ dateNow, nickname, chatMessage });
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });
  
  const getAllMessage = await getAllMessages();
  socket.emit('messageAll', getAllMessage);

  socket.on('disconnect', () => {
  allUsers = allUsers.filter(({ id }) => id !== socket.id);
  io.emit('userOn', allUsers);
});
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// Agradecimento ao Lucas Martins