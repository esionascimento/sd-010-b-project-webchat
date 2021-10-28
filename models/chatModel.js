// FEITO COM AJUDA DO ZÓZIMO
const connection = require('./connection');

const getMessages = () => connection().then((db) => db.collection('messages').find().toArray());

const addMessage = ({ nickname, message, timestamp }) => connection().then((db) => 
  db.collection('messages').insertOne({ nickname, message, timestamp }));

module.exports = {
  getMessages,
  addMessage,
};