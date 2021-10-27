const moment = require('moment');

const chat = (io) => {
  io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('disconnect', () => {
      console.log('user disconnect', socket.id);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const data = moment().format('DD-MM-YYYY HH:mm:ss');
      console.log('message', chatMessage, data);
      io.emit('message', `${data} - ${nickname}: ${chatMessage}`);
    });
  });
};

module.exports = chat;