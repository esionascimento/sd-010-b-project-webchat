const chatService = require('../service/chatService');

const createMessage = async (dateNow, nickname, chatMessage) => {
  await chatService.createMessage(dateNow, nickname, chatMessage);
};

const getAllMessages = async (req, res) => {
  const getAll = await chatService.getAllMessages();
  res.status(201).json(getAll);
};

module.exports = {
  createMessage,
  getAllMessages,
};
