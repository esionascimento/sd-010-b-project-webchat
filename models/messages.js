const connection = require('./connection');

const getAll = () =>
  connection().then((db) => db.collection('messages').find({}).toArray());

const insertOne = (chatMessage, nickname, timestamp) =>
  connection().then((db) =>
    db
      .collection('messages')
      .insertOne({ message: chatMessage, nickname, timestamp }));

module.exports = {
  getAll,
  insertOne,
};
