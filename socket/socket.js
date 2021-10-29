const messagesModel = require('../models/messages');

module.exports = (io) => io.on('connection', (socket) => {
socket.on('message', async (message) => {
  await messagesModel
  .createMessageModel(message.message, message.nickname, message.timestamp);
  const data = ` ${message.timestamp}-${message.nickname}: ${message.message}`;
  
  socket.emit('refreshMessages', data);
});

socket.on('start', async () => {
  const data = await messagesModel.getAllModel();
  socket.emit('startMessages', data);
});

socket.on('nick', async (user) => {
  const users = [];
  users.push(user.newNick);
  
  console.log(users, 'users');
  // if (user.oldNick) { users.splice(users.indexOf(user.oldNick), 1); }
  socket.emit('refreshNick', users);
});
});