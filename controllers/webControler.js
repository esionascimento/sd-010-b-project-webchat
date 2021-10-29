const webModel = require('../models/webModel');

const saveMessages = async (body) => {
  const messages = await webModel.saveMessages(body);
  return messages;
  // return res.status(200).json({ messages });
};

const getAll = async () => webModel.getAll();

module.exports = {
  saveMessages,
  getAll,
};