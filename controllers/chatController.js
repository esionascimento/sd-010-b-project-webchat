const chatModel = require('../models/chatModel');

const createMessage = async (sms) => {
  await chatModel.createMessage(sms);
};

const getAllMessages = async () => chatModel.getAllMessages();

module.exports = { createMessage, getAllMessages };