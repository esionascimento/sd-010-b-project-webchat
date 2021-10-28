const userModel = require('../models/userModel');
const messageModel = require('../models/messageModel');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async (message) => {
    const { chatMessage, nickname } = message;
    // fonte: https://blog.betrybe.com/javascript/javascript-date-format/
    const data = new Date();
    const dataForm = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`;
    const time = `${data.getHours()}:${(data.getMinutes() + 1)}:${data.getSeconds()}`;
    const timestamp = `${dataForm} ${time}`;
    io.emit('message', `${dataForm} ${time} - ${nickname}: ${chatMessage}`);
    await messageModel.addMessage(chatMessage, nickname, timestamp);
  });

  socket.on('userConn', async (nickname) => {
    io.emit('userConn', userModel.newUser(socket.id, nickname));
    const list = await messageModel.getAll();
    io.emit('history', list);
  });

  socket.on('disconnect', () => {
    const usersList = userModel.removeUser(socket.id);
    io.emit('userConn', usersList);
  });  
});
