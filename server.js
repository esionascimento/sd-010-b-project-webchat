const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
// .env
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(
  {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  },
));
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets')(io);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (_req, res) => res.render('Chat'));

server.listen(PORT, () => console.log(`O pai tá on na porta ${PORT}`));