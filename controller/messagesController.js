const messagesModel = require('../models/messagesModel');

const getAllMesssages = async () => {
  const allMessages = await messagesModel.getAllMesssages();
  return allMessages;
};

const creatMessage = async (params) => {
  const { dateAndHour: timestamp, nickname, chatMessage: message } = params;
  const objMessage = { timestamp, nickname, message };
  await messagesModel.creatMessage(objMessage);
};

module.exports = {
  getAllMesssages,
  creatMessage,
};