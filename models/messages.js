const connection = require('./connection');

const getAllMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  return messages;
};

const saveMessages = async ({ chatMessage, nickname }) => {
  const db = await connection();
  await db.collection('messages')
    .insertOne({ 
      chatMessage, nickname, timestamp: new Date().toLocaleString('en-US').replace(/\//g, '-') });
};

module.exports = {
  getAllMessages,
  saveMessages,
};