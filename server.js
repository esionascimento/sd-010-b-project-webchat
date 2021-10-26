const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

app.use(cors());
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`ID: ${socket.id}`);
});

http.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});
