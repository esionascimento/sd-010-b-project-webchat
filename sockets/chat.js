const { createMessage, getAll } = require('../models/messagesModel');
const getCurrentTime = require('../public/utils/getTime');
const { removeUser, addUser, updateUser, getAllUsers } = require('../public/utils/usersHandlers');

const conn = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageObj = { message: chatMessage, nickname, timestamp: getCurrentTime() };
      createMessage(messageObj);
      io.emit('message', `${getCurrentTime()} ${nickname} ${chatMessage}`);
    });

    socket.on('newUser', async (user) => {
      addUser(socket.id, user);
      const msgs = await getAll();
      io.emit('newUser', { users: getAllUsers(), msgs });
    });

    socket.on('updateUser', (user) => {
      const users = updateUser(socket.id, user);
      io.emit('newUser', { users });
    });

    socket.on('disconnect', () => {
    const users = removeUser(socket.id);
      io.emit('newUser', { users });
    });
  });

  module.exports = conn;