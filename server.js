const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, 
    methods: ['GET', 'POST'],
  } });
  
const { getAllMessages } = require('./controllers/webchatController');

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', getAllMessages);
require('./sockets/chat')(io);

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
