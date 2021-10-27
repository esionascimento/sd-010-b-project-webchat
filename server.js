require('dotenv').config();
const express = require('express');
// const cors = require('cors');
// const LanguageController = require('./controllers/LanguageController');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const PORTA = 3000;

 const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORTA}`,
    methods: ['GET', 'POST'],
  },
});
// app.use(cors());

app.get('/', (req, res) => {
  res.render(`${__dirname}/views/chat.ejs`);
});

app.use(express.static(`${__dirname}/views`));

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const dateNow = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${dateNow} - ${nickname} ${chatMessage}`);
  });
});

// app.use('/languages', LanguageController);
// require('./sockets/votes')(io);

http.listen(PORTA, () => console.log(`Rodando na porta ${PORTA}`));