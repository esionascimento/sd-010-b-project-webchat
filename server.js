require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

const io = require('socket.io')(http, {
  cors: {
    origin: `https://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(cors());

app.set('view engine', 'ejs');

app.set('views', './views');

app.get('/', (req, res) => {
  res.status(200).render('index');
});

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const now = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${now} - ${nickname} ${chatMessage}`);
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
