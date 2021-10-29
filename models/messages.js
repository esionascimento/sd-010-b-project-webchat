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

const updateUserNick = async (nick, oldNick) => {
  const db = await mongoConnection();
  const messages = db.collection('messages')
    .updateOne({ nickname: nick }, { $set: { nickname: oldNick } });
  return messages;
};

const getMessageById = async (_id) => {
  const db = await mongoConnection();
  const messages = db.collection('messages')
    .findOne({ _id });
    return messages;
};

const createUser = async (nick) => {
  const db = await mongoConnection();
  const user = db.insertOne({ nickname: nick, conected: true });
  return user;
};

module.exports = { getAllModel, createMessageModel, updateUserNick, getMessageById, createUser };