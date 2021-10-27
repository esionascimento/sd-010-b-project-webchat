const connection = require('./connection');

const getMessages = async () => {
  const result = await connection()
    .then((db) => db.collection('messages').find().toArray());
  return result;
};

const insertMessage = async (message, nickname, timestamp) => {
    await connection().then((db) => {
    db.collection('messages').insertOne({ message, nickname, timestamp });
  });
};

module.exports = {
  getMessages,
  insertMessage,
};