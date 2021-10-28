const messagesModel = require('../models/messagesModel');

const getAllMesssages = async () => {
  const allMessages = await messagesModel.getAllMesssages();
  return allMessages;
};

const creatMessage = async (params) => {
  await messagesModel.creatMessage(params);
};

module.exports = {
  getAllMesssages,
  creatMessage,
};