const connection = require('./connection');

const getMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find().toArray();
  const prettyMessage = messages.map((message) =>
  `${message.timestamp} - ${message.nickname}: ${message.message}`);
  return prettyMessage;
};

const createMessage = async (data) => {
  const db = await connection();
    const { chatMessage, nickname, finalDate } = data;
    const newMessage = { message: chatMessage, nickname, timestamp: finalDate };
    return db.collection('messages').insertOne(newMessage);
};

module.exports = {
  getMessages,
  createMessage,
};
