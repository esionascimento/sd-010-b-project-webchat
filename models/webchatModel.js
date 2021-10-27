const mongoConnect = require('./connection');

const saveMessage = async ({ message, nickname, timestamp }) => {
  const MessagesCollection = await mongoConnect()
    .then((db) => db.collection('messages'));

  await MessagesCollection.insertOne({ message, nickname, timestamp });
};

const getAll = async () => {
  const MessagesCollection = await mongoConnect()
    .then((db) => db.collection('messages'));

  const messages = await MessagesCollection.find().toArray();

  return { messages };
};

module.exports = {
  saveMessage,
  getAll,
};
