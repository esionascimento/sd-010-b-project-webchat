const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

const socketIoServer = require('http').createServer();

const io = require('socket.io')(socketIoServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// io.on('connection', (socket) => {
//   socket.on('posting', (data) => {
//     console.log(data);
//     io.emit('notification', { title: 'NAO_MODERADO', message: data.message });
//   });
// });

app.listen(PORT, () => {
  console.log(`App listening onx port ${PORT}`);
});