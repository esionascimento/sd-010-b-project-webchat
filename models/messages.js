const connection = require('./connection');

const findAllMessages = async () => {
  const db = await connection();
  const result = await db.collection('messages').find().toArray();
  return result;
};

const createMessage = async ({ chatMessage, nickname, timestamp }) => {
  const db = await connection();
  const result = await db.collection('messages').insertOne({
    chatMessage,
    nickname,
    timestamp,
  });
  return result;
};

module.exports = {
  findAllMessages,
  createMessage,
};