const webchatModel = require('../models/webchatModel');

const root = async (req, res) => {
    const messages = await webchatModel.getMessages();
    res.render('webchat.ejs', { messages });
};

const saveMessage = async (payload) => {
    try {
        await webchatModel.saveMessage(payload);
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    root,
    saveMessage,
};
