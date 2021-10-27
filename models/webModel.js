const connection = require('./connection');

const saveMessages = async (body) => {
  const db = await connection();
  const message = await db.collection('message').insertOne({ ...body });
  return message;
};

module.exports = {
  saveMessages,
};