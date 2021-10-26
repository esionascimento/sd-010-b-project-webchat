const moment = require('moment');
const CreateMessage = require('../models/chat');

moment.defaultFormat = 'DD-MM-yyyy HH:mm:ss';

const users = [];

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

  const user = '';

  userList(socket, io);

  socket.emit('connected', user);
});