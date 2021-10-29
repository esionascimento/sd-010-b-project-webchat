const connection = require('./connection');

const getAllMessages = async () => {
  const messages = await connection().collections('messages').find({}).toArray();
  return messages;
};

module.exports = {
  getAllMessages,
};
