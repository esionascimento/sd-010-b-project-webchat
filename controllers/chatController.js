const chatModel = require('../models/chatModel');

const inialPage = async (req, res) => {
  const messages = await chatModel.findAll() || [];

  console.log(messages);

  res.status(200).render('chat', { messages });
};

module.exports = {
  inialPage,
};