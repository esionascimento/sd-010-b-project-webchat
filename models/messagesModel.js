const connection = require('./connection');

const getAllMesssages = async () => {
const db = await connection();
const allMessages = await db.collection('messages').find({}).toArray();
const arrayMessages = allMessages
  .map(({ timestamp, nickname, message }) => `${timestamp} - ${nickname} ${message}`);

return arrayMessages;
};

const creatMessage = async (message) => {
  const db = await connection();
  await db.collection('messages').insertOne(message);
};

module.exports = {
  getAllMesssages,
  creatMessage,
};