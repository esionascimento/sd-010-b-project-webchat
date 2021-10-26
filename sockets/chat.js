module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('serverMessage', 'Seja bem vindo ao nosso chat público!')

  socket.on('message', (text) => {
    io.emit('message', text.chatMessage);
  });
});