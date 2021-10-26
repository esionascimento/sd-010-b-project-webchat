const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  const prettyMessage = messages.map((message) =>
  `${message.timestamp} - ${message.nickname}: ${message.message}`);
  return prettyMessage;
};

module.exports = {
  getAllMessages,
};
