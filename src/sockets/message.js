const messagesModel = require('../models/messagesModel');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async (message) => {
      const { chatMessage, nickname } = message;
      const now = new Date().toLocaleString().replace(/\//g, '-'); // thanks for the tip, Lucas Martins. https://github.com/tryber/sd-010-b-project-webchat/pull/14
      
      await messagesModel.addMessage(chatMessage, nickname, now);
      io.emit('message', `${now} - ${nickname}: ${chatMessage}`);
    });
  });
};
