require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
 });

 const { getDate, format } = require('./utils');

 const date = getDate();

 app.use(cors());

 const everyMessage = [];

 // função executada quando um cliente se conecta
 io.on('connection', (socket) => {
  console.log(`${socket.id} conectado`);

  socket.on('message', ({ chatMessage, nickname }) => {
    const formatMessage = format(chatMessage, nickname, date);
    everyMessage.push({ chatMessage, nickname }, date);
    io.emit('message', formatMessage);
  });
  
  socket.on('new-user', (user) => {
    console.log(user);
    io.emit('new-user', user);
  });

  socket.emit('mensagem',
  console.log(everyMessage, `send by ${socket.id}`));
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
 });

http.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});
