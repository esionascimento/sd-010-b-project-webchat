const connection = require('./connection');

const createMessage = async (timestamp, nickname, message) => {
  console.log('model', timestamp, nickname, message);
  const webchat = await connection();
  const user = await webchat.collection('messages');
  const query = { timestamp, nickname, message };
  await user.insertOne(query);
};

const getAllMessages = async () => {
  const webchat = await connection();
  const getAll = await webchat.collection('messages');
  const result = await getAll.find().toArray();
  return result;
};

module.exports = {
  createMessage,
  getAllMessages,
};
