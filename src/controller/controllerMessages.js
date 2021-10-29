const { getAllMessages } = require('../models/modelMessagejs');

const controllerGetAllMessages = async (req, res) => {
    const messagesAll = await getAllMessages();
    res.status(200).json(messagesAll);
};

module.exports = { controllerGetAllMessages };