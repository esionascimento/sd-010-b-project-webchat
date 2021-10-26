const moment = require('moment');
const CreateMessage = require('../models/chat');
// https://momentjs.com/
moment.defaultFormat = 'DD-MM-yyyy HH:mm:ss';

let users = [];

const userList = (socket, io) => {
  socket.on('userNickname', (nickname) => {
    users.push(nickname);
    io.emit('users', users);
  });
};

const createMessage = async (io, socket, timestamp) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = chatMessage;
    await CreateMessage.create({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });
};

module.exports = (io) => io.on('connection', async (socket) => {
  const timestamp = moment().format();

  createMessage(io, socket, timestamp);
  
  userList(socket, io);
  
  let user = '';
  user = socket.id.slice(0, 16);

  socket.emit('connected', user);

  socket.on('updateNickname', (nickname) => {
    users = users.map((name) => (name === user ? nickname : name));
    user = nickname;
    io.emit('users', users);
  });
});