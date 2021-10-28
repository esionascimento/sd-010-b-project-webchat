const express = require('express');
const path = require('path');
const { createServer } = require('http');

const PORT = 3000;
const app = express();
const httpServer = createServer(app);

app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat.js')(io);

app.get('/', (req, res) => {
  res.render('webChat');
});

httpServer.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
