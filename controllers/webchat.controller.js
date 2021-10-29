const webchatModel = require('../models/webchat.model');

const saveMessage = async (data) => {
  await webchatModel.saveMessage(data);
};
const getAllMessages = async (_req, res) => {
  const messages = await webchatModel.getAllMessages();
  res.status(200).render('index.ejs', { messages });
};

module.exports = { saveMessage, getAllMessages };