const userModel = require('../models/userModel');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    // fonte: https://blog.betrybe.com/javascript/javascript-date-format/
    const data = new Date();
    const dataForm = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`;
    const time = `${data.getHours()}:${(data.getMinutes() + 1)}:${data.getSeconds()}`;
    io.emit('message', `${dataForm} ${time} - ${nickname}: ${chatMessage}`);
  });

  socket.on('userConn', (nickname) => {
    const usersList = userModel.newUser(socket.id, nickname);
    io.emit('userConn', usersList);
  });

  socket.on('disconnect', () => {
    // console.log(socket.id)
    const usersList = userModel.removeUser(socket.id);
    io.emit('userConn', usersList);
  });  
});
