const getDateFormated = require('../helpers/getDateFormated');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ nickname, chatMessage }) => {
    const timestamp = getDateFormated();

    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});