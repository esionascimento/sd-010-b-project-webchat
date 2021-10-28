const modelFunction = require('../models/chatModel');

const getChat = async (_req, res) => {
  const messages = await modelFunction.getMessages();
  res.status(200).render('chat', { messages });
};

module.exports = {
  getChat,
};