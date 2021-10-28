const { getAllMessages } = require('../models');

const getMessages = async (_req, res) => {
  const messages = await getAllMessages();
  res.status(200).render('chat', { messages });
};

module.exports = {
  getMessages,
};