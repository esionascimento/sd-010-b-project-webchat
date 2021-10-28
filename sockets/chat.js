const { dateNow } = require('../helper/date');
 
 module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userOn', (nickname) => {
    console.log(`ONline ${nickname}`);
    io.emit('userOn', nickname);
  });

  socket.on('disconnect', (name) => {
    console.log('desconecata', name);
    socket.broadcast.emit('userOff', name);
  });

  socket.on('updateUserOn', (changeUser) => {
    console.log(`Update ${changeUser}`);
    io.emit('updateUserOn', changeUser);
  });

  socket.on('message', (message) => {
    console.log(`Mensagem ${message.nickname}`);
    io.emit('message', `${dateNow()} - ${message.nickname}: ${message.chatMessage}`);
  });
});