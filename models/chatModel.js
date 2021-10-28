const connection = require('./connection');

const createMessage = async ({ dateNow: timestamp, chatMessage: message, nickname }) => {
const db = await connection();
await db.collection('messages').insertOne({ timestamp, message, nickname });
};

const getAllMessages = async () => {
const db = await connection();
const allMessages = await db.collection('messages').find().toArray();
return allMessages;
};

module.exports = { createMessage, getAllMessages };