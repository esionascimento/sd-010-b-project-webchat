const webchatModel = require('../models/webchatModel');

const getAllMessages = async (req, res) => {
  const messages = await webchatModel.getAllMessages();
  res.render('webchat.ejs', { messages });
};

module.exports = { getAllMessages };
