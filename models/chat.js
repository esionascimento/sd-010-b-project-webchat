// const { ObjectId } = require('mongodb');
const connection = require('./connection');

// CREATE
const add = async (message, nickname, timestamp) => {
  const db = await connection();
  await db.collection('messages')
  .insertOne({ message, nickname, timestamp });
  // console.log(messageOne);
};

// GETALL
const getAll = async () => {
  const db = await connection();
  const messageAll = await db.collection('messages')
  .find().toArray();
  return messageAll;
};

module.exports = { add, getAll };