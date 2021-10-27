module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('data', () => {
    console.log('Bem vindo');
  });
});