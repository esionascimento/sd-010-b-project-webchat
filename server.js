const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.json());
app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Novo usuário conectado: ${socket.id}`);

  socket.on('message', ({ chatMessage, nickname }) => {
  const currentDate = new Date(); 
  const date = `${currentDate.getDate()}-${
(currentDate.getMonth() + 1)}-${currentDate.getFullYear()}`;
  
  let time = `${currentDate.getHours()}:${currentDate.getMinutes()} AM`;
  if (currentDate.getHours() > 12) {
    time = `${currentDate.getHours() - 12}:${currentDate.getMinutes()} PM`;
  }

    io.emit('message', `${date} ${time} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log(`Usuário desconectou: ${socket.id}`);
  });
});

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(3000, () => {
  console.log('Escutando na porta 3000...');
});