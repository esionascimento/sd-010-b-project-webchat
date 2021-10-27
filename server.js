require('dotenv').config();
const express = require('express');
const http = require('http');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const httpServer = http.createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));

app.get('/', (_req, res) => {
  res.render(`${__dirname}/views/index.ejs`);
});

let onlineUsers = [];

io.on('connection', (socket) => {
  socket.on('message', ({
    chatMessage,
    nickname,
  }) => {
    const today = new Date().toLocaleString().replace(/\//g, '-');
    io.emit('message', `${today} - ${nickname}: ${chatMessage}`);
  });

  socket.on('newLogin', (nickname) => {
    onlineUsers.push({
      nickname,
      id: socket.id,
    });
    io.emit('userList', onlineUsers);
  });
});

io.on('connection', (socket) => {
  socket.on('newNickname', (nickname) => {
    onlineUsers = onlineUsers.map((user) => {
      if (user.id === socket.id) {
        return {
          nickname,
          id: socket.id,
        };
      }
      return user;
    });

    io.emit('userList', onlineUsers);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);

    io.emit('userList', onlineUsers);
  });
});

httpServer.listen(PORT, () => console.log(`listening on port ${PORT}`));