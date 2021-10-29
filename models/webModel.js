const connection = require('./connection');
const { dataCerta, horaCerta } = require('../utils/util');

const saveMessages = async (body) => {
  const db = await connection();
  const { ops } = await db.collection('messages').insertOne({
     ...body, timestamp: `${dataCerta()} ${horaCerta()}` });
  const { message, nickname, timestamp } = ops[0];
  console.log({ message, nickname, timestamp });
  return { message, nickname, timestamp };
};

const getAll = async () => connection().then((db) => db.collection('messages').find({}).toArray());

module.exports = {
  saveMessages,
  getAll,
};