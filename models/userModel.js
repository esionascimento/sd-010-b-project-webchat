const connection = require('./connection');

const createMessages = async ({ dateNow: timestamp, chatMessage: message, nickname }) => {
  const db = await connection();
  await db.collection('messages').insertOne({ timestamp, message, nickname });
};

const getAllMessages = async () => {
  const db = await connection();

  const messages = await db.collection('messages').find().toArray();
  
  return messages;
};

module.exports = {
  createMessages,
  getAllMessages,
};
