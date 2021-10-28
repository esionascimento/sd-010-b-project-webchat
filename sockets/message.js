const { createMessage, getAllMessages } = require('../models/chat');
const { newDate } = require('../utils/chat');

module.exports = (io) => {   
  io.on('connection', async (socket) => {
    socket.on('message', async (msg) => {
      const newMessage = `${newDate()} - ${msg.nickname}: ${msg.chatMessage}`;
      await createMessage({ 
        message: msg.chatMessage,
        nickname: msg.nickname,
        timestamp: newDate(),
      });
      io.emit('message', newMessage);
    });

    const messages = await getAllMessages();
    socket.emit('allMessages', messages);
  });
};
