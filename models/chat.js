// const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { dateNow } = require('../helper/date');
// CREATE
const add = async (message, nickname) => {
  const db = await connection();
  await db.collection('messages')
  .insertOne({ nickname, message, timestamp: dateNow() });
  // console.log(messageOne);
};

// GETALL
const getAll = async () => {
  const db = await connection();
  const messageAll = await db.collection('messages')
  .find().toArray();
  // console.log(messageAll);
  return messageAll;
};

module.exports = { add, getAll };