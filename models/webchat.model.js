const connection = require('./connection');

const saveMessage = async (data) => {
  const db = await connection();
  await db.collection('messages').insertOne(data);
};

const getAllMessages = async () => {
  const db = await connection();
  const allMessages = await db.collection('messages').find().toArray();
  return allMessages;
};

module.exports = { saveMessage, getAllMessages };