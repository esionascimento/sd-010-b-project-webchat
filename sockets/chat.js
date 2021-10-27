const getDateFormated = require('../helpers/getDateFormated');

module.exports = (io) => io.on('connection', (socket) => {
  const id = socket.id.slice(0, 11);
  socket.emit('connected', `user-${id}`);

  io.emit('newUserConnected', '');

  socket.on('message', ({ nickname, chatMessage }) => {
    const timestamp = getDateFormated();

    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});
