const chatModel = require('../../models/chatModel');

const serialise = (db) => {
  const { timestamp, nickname, message } = db;
  return `${timestamp} - ${nickname} ${message}`;
};

const createMessage = async (timestamp, nickname, message) => {
  chatModel.createMessage(timestamp, nickname, message);
};

const getAllMessages = async () => {
  const result = await chatModel.getAllMessages();
  return result.map(serialise);
};

module.exports = {
  createMessage,
  getAllMessages,
};
