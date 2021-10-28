const connection = require('./connection');

const getConneWithWebchat = async () => {
  const db = await connection();
  const collectionUser = await db.collection('messages');

  return collectionUser;
};

const create = async ({ chatMessage, nickname, timestamp }) => {
  const collectionWebchat = await getConneWithWebchat();

  const { insertedId: _id } = await collectionWebchat
    .insertOne({ chatMessage, nickname, timestamp });
  return { _id, chatMessage, nickname, timestamp };
};

const findAll = async () => {
  const collectionWebchat = await getConneWithWebchat();
  const allMessages = await collectionWebchat.find().toArray();

  return allMessages;
};

module.exports = {
  create,
  findAll,
};
