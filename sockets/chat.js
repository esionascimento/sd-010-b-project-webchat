module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('on', () => {
    console.log('to aqui');
  });
});
