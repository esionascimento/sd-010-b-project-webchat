module.exports = (io) => io.on('connection', (socket) => {
  const dateNow = new Date().toLocaleString().replaceAll('/', '-');

  console.log('alguém se conectou');

  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${dateNow} - ${nickname}: ${chatMessage}`);
  });

  socket.on('disconnect', () => {
    console.log('alguém se desconectou');
  });
});
