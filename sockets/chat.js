const moment = require('moment');
const model = require('../models/messages');

const users = {};

const structurMessage = async (message, nickname) => {
  const timestamp = moment().format('DD-MM-yyyy LTS');
  await model.create({ timestamp, message, nickname });
  return `${timestamp} ${nickname} ${message}`;
};

module.exports = (io) => io.on('connection', async (socket) => {
  const historicMessages = await model.getAll().then((e) =>
    e.map(({ timestamp, nickname, message }) => `${timestamp} ${nickname} ${message}`));

  users[socket.id] = socket.id.slice(0, 16);

  io.emit('newUser', { user: users[socket.id] });

  socket.emit('historicMessage', historicMessages);

  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;
    io.emit('newUser', { user: nickname });
  });

  socket.on('message', async (message) => {
    const response = await structurMessage(message, users[socket.id]);
    io.emit('message', response);
  });
});
