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

 const { getDate } = require('./utils');

 const date = getDate();

 app.use(cors());

 const everyMessage = [];

 // função executada quando um cliente se conecta
 io.on('connection', (socket) => {
  console.log(`${socket.id} conectado`);
  socket.on('message', (message) => {
    everyMessage.push({ date, message });
    io.emit('message', { date, message });
  });
  
  socket.on('new-user', (user) => {
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
