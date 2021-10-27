const modelChat = require('../models/modelChat');

const getChat = async (req, res) => {
  const messages = await modelChat.getAll();
  res.status(200).render('chat', { messages });
};

module.exports = { getChat };