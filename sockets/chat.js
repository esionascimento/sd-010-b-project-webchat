// const messages = [];

const { newMessage, getMessages } = require('../models/chat');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const dateNow = new Date().toLocaleString().replaceAll('/', '-');
    
    // getMessages 
    socket.emit('getMessages', await getMessages());

    socket.on('message', async ({ nickname, chatMessage }) => {
      const message = `${dateNow} ${nickname}: ${chatMessage}`;
      // adicionar ao banco
      const dataMessage = { 
        message: chatMessage,
        nickname,
        timestamp: dateNow,
      };
      await newMessage(dataMessage);
      // messages.push(message);
      io.emit('message', message);
    });
  });
}; 