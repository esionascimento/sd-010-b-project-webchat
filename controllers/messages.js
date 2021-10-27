const msgModel = require('../models/messagesModel');

const createMsg = async (message, nickname, timestamp) => {
await msgModel.createMsg(message, nickname, timestamp);
};

const getAllMsg = async () => msgModel.getAllMsg();

module.exports = { createMsg, getAllMsg };