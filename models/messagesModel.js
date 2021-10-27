const connection = require('./connection');

const createMsg = async (message, nickname, timestamp) => {
  const db = await connection();
  db.collection('messages').insertOne({ message, nickname, timestamp });
};

const getAllMsg = async () => {
  const db = await connection();
  return db.collection('messages').find().toArray();
};

module.exports = {
  createMsg,
  getAllMsg,
};