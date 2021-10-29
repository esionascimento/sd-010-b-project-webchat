

module.exports = (io) => io.on('connection', (socket) => {
  socket.broacast.emit('messages')
});
