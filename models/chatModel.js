const connection = require('./connection');

const create = async () => {
  const connect = await connection();
  await connect.collection('chat').insert();
};

module.exports = {
  create,
};