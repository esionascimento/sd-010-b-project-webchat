const { getMessages, createMessage } = require('../models/webchatModel');

const getAllMessages = async (req, res) => {
  const messages = await getMessages();
  res.render('webchat.ejs', { messages });
};

const createMessages = async (message) => {
    try {
        await createMessage(message);
    } catch (e) {
        console.log(e);
    }
};

module.exports = { getAllMessages, createMessages };
