const User = require('../models/userModel');

const createMessages = async (data) => {
  await User.createMessages(data);
};

const getAllMessages = async () => User.getAllMessages();

module.exports = {
  createMessages,
  getAllMessages,
};
