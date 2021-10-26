const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, 
    methods: ['GET', 'POST'],
  } });
  
app.use(cors());

app.set('view engine', 'ejs');

io.on('connection', (socket) => {
  console.log('Teste conexao');

  socket.on('disconnect', () => {
    console.log('saida');
  });

  socket.on('newMessage', (msg) => {
    console.log(msg);
    io.emit('serverMessage', { message: msg });
  });
  socket.broadcast.emit('serverMessage', { message: 'conection done' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/chat/index.html'));
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
