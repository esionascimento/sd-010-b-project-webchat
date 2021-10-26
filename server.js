// Faça seu código aqui
const express = require('express');
require('dotenv');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);

app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('chat');
});

http.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});