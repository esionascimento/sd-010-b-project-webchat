const webModel = require('../models/webModel');

const saveMessages = async (req, res) => {
  const messages = await webModel.saveMessages(req.body);
  return res.status(200).json({ messages });
};

module.exports = {
  saveMessages,
};