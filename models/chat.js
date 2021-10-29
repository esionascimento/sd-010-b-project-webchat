const connection = require('./connection');

const getAllMessages = async () => { 
  await connection().collections('messages').find({}).toArray();
};

const saveMessage = async (message, nickname, timestamp) => {
  await connection().collections('messages').insertOne({
    message,
    nickname,
    timestamp,
  });
};

module.exports = {
  getAllMessages,
  saveMessage,
};
