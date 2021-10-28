const moment = require('moment');

module.exports = (io) =>
  io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('message', (message) => {
      io.emit(
        'message',
        `${moment(new Date()).format('DD-MM-yyyy HH:mm:ss')} - ${
          message.nickname
        }: ${message.chatMessage}`,
      );
    });
  });
