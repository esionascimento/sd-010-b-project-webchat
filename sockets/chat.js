const { getDateTime } = require('../utils/dateTime');
const { insertOne } = require('../models/messages');
const { changeNickname, createUser, removeUser } = require('../utils/users');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    insertOne(chatMessage, getDateTime(), nickname);
    io.emit('message', `${getDateTime()} - ${nickname}: ${chatMessage}`);
  });

  socket.on('createUser', ({ originalNickname }) => {
    socket.broadcast.emit('changeNickname', createUser(socket, originalNickname));
  });

  socket.on('changeNickname', ({ originalNickname, nickname }) => {
    io.emit('changeNickname', changeNickname(socket, originalNickname, nickname));
  });

  socket.on('disconnect', () => {
    io.emit('changeNickname', removeUser(socket));
  });
});