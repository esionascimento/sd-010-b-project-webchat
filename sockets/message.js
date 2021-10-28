const getDateFormated = require('../helpers/getDateFormated');
const chatModel = require('../models/chatModel');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const timestamp = getDateFormated();

    await chatModel.create({ chatMessage, nickname, timestamp });

    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
});