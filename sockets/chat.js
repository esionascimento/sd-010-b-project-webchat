const getDateFormated = require('../helpers/getDateFormated');

module.exports = (io) => io.on('connection', (socket) => {
  console.log(`userId: ${socket.id} conectado.`);

  socket.on('message', ({ nickname, chatMessage }) => {
    const timestamp = getDateFormated();

    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});
