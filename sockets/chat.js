module.exports = (io) => io.on('connection', (socket) => {
  const dateNow = new Date().toLocaleString().replaceAll('/', '-');
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${dateNow} ${nickname}: ${chatMessage}`);
  });

  // socket.on('nickName', (nick) => {
  //   io.emit('userName', nick);
  // });
});