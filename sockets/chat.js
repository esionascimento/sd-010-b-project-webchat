module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} se conectou`);

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('alguém saiu');
  });
});