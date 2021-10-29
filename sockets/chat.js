const model = require('../models/messages');

const users = {};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log('to aqui');

  const historicMessages = await model.getAll().then((e) =>
    e.map(({ timestamp, nickname, message }) => `${timestamp} ${nickname} ${message}`));

  users[socket.id] = socket.id.slice(0, 16);

  socket.emit('newUser', { user: users[socket.id], historicMessages });
});
