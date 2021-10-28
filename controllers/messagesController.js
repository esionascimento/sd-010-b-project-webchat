const { findAllMessages, createMessage } = require('../models/messages');

const getAllMessages = async () => {
  const result = await findAllMessages();
  return result;
};

const postMessage = async ({ chatMessage, nickname, timestamp }) =>
createMessage({ chatMessage, nickname, timestamp });

module.exports = {
  getAllMessages,
  postMessage,
};