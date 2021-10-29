const connection = require('./connection');

const create = async ({ message, name, timestamp }) => {
  const connect = await connection();
  await connect.collection('messages').insertOne({ message, name, timestamp });
};

const getAll = async () => {
  const connect = await connection();
  const result = await connect.collection('messages').find().toArray();
  return result;
};

/* 
{
  message: 'Lorem ipsum',
  nickname: 'xablau',
  timestamp: '2021-04-01 12:00:00'
}
 */

module.exports = {
  create,
  getAll,
};