const connection = require('./connection');

const addMessage = async (mensagem, apelido, time) => connection()
  .then((db) => db.collection('messages').insertOne({ mensagem, apelido, time }))
  .then((result) => result.ops[0]);

  const getAll = async () => connection()
  .then((db) => db.collection('messages').find().toArray())
  .then((result) => result);

module.exports = {
  addMessage,
  getAll,
};
