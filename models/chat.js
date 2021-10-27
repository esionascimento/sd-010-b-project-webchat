const connect = require('./connection');

const newMessage = async (dataMessage) => {
  const db = await connect();
  db.collection('messages').insertOne(dataMessage);
};

const getMessages = async () => {
  const db = await connect();
  return db.collection('messages').find().toArray();
};

module.exports = {
  newMessage,
  getMessages,
};