const connection = require('./connection');

const getMessages = async () => {
    const db = await connection();
    const messages = await db.collection('messages').find().toArray();
    const formattedMessages = messages.map((message) =>
    `${message.timestamp} - ${message.nickname}: ${message.message}`);
    return formattedMessages;
};

const saveMessage = async (payload) => {
    const { chatMessage, nickname, formattedDate } = payload;
    const db = await connection();
    const data = { message: chatMessage, nickname, timestamp: formattedDate };
    return db.collection('messages').insertOne(data);
};

module.exports = {
    getMessages,
    saveMessage,
};
