const connection = require('./connection');

const getAllMessages = async () => {
  const db = connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

module.exports = { getAllMessages };