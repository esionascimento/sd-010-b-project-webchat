module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('userConnect', socket.id);

  socket.on('clientMessage', (message) => {
    console.log(`Mensagem: ${message}`);
    io.emit('serverMessage', message);
  });
});
