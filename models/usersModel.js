const connection = require('./connection');

const getUsers = async () => {
  const result = await connection().then((db) => {
    db.collection('onlineUsers').find({}).toArray();
  });
  return result;
};

const insertUser = async (user) => {
  const { _id } = await connection().then((db) => {
    db.collection('onlineUsers').insertOne({ people: user });
  });
  const id = _id;
  return id;
};

const deleteUser = async (user) => {
  const db = await connection();
  await db.collection('recipes').deleteOne({ people: user });
};

module.exports = {
  getUsers,
  insertUser,
  deleteUser,
};