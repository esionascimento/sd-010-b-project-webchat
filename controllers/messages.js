const model = require('../models/messages');

const getAllMessages = async () => {
  const messages = await model.getAllMessages();
  return messages;
};

const saveMessages = async (chatData) => {
  console.log('aqui');
  await model.saveMessages(chatData);
};

module.exports = {
  getAllMessages,
  saveMessages,
};
