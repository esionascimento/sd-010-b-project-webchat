const { newDate } = require('../utils/chat');

module.exports = (io) => {   
  io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      const newMessage = `${newDate()} - ${msg.nickname}: ${msg.chatMessage}`;  
      io.emit('message', newMessage);
    });
  });
};
