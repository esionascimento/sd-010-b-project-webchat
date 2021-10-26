const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
const user = {

};

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

io.on('connection', (socket) => {
  socket.on('salveUser', (name) => {
    const now = new Date();
    user.name = name;
    user.data = now.toISOString().substr(0, 10).split('-').reverse()
    .join('-');
    console.log('user :', user);
  });
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/chat', (_req, res) => res.render('Chat'));

server.listen(PORT, () => console.log(`O pai tá on na porta ${PORT}`));