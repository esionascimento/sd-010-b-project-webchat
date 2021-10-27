const mongoConnection = require('./connectionLocal');

const getAllModel = async () => {
  const db = await mongoConnection();
  const messages = db.collection('messages').find({}).toArray();
  return messages;
};

const createMessageModel = async (message, nickname, timestamp) => {
  const db = await mongoConnection();
  const messages = db.collection('messages').insertOne({ message, nickname, timestamp });
  return messages;
};

const updateMessage = async (nick, oldNick) => {
  const db = await mongoConnection();
  const messages = db.collection('messages')
    .updateOne({ nickname: nick }, { $set: { nickname: oldNick } });
  return messages;
};

module.exports = { getAllModel, createMessageModel, updateMessage };