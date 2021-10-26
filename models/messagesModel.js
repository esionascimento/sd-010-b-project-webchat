const connection = require('./connection');

const createMessage = async (message) => connection().then((db) =>
    db
      .collection('messages')
      .insertOne(message));

const getAll = async () => connection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  createMessage,
  getAll,
};