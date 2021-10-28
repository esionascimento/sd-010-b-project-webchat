const { dateNow } = require('../helper/date');
 
 module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Mensagem ${message.nickname}`);
    io.emit('message', `${dateNow()} - ${message.nickname}: ${message.chatMessage}`);
  });
});