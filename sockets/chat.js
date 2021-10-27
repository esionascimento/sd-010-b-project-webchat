const messages = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    const dateNow = new Date().toLocaleString().replaceAll('/', '-');
  
    socket.emit('getMessages', messages);

    socket.on('message', ({ nickname, chatMessage }) => {
      const message = `${dateNow} ${nickname}: ${chatMessage}`;
      messages.push(message);
      io.emit('message', message);
    });
  });
}; 