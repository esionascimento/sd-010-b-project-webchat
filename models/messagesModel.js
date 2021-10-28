const connection = require('./connection');

const getAllMesssages = async () => {
const db = await connection();
const allMessages = await db.collection('messages').findAll({}).toArray();
return allMessages;
};

const creatMessage = async (d) => {
  const db = await connection;
  await db.collection('message').insertOne({ d });
};

module.exports = {
  getAllMesssages,
  creatMessage,
};