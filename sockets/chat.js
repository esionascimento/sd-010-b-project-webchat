const { createMessage, getAll } = require('../models/messagesModel');
const getCurrentTime = require('../public/utils/getTime');
const { removeUser, addUser, updateUser, getAllUsers } = require('../public/utils/usersHandlers');

const conn = (io) => io.on('connection', (socket) => {
    socket.on('newUser', async (user) => {
      addUser(socket.id, user);
      const msgs = await getAll();
      io.emit('newUser', { users: getAllUsers(), msgs });
    });


  module.exports = conn;