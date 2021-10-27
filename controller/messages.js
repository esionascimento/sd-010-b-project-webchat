const modelMessages = require('../models/messages');

const getAll = async (req, res) => {
  try { 
  const messages = await modelMessages.getAllModel();
  // return res.status(200).json({ data: messages });
  return res.render('messagesList', { data: messages });
  } catch (err) {
    console.log(err.message);
  }
};

const createMessage = async (req, res) => {
  const { message, nickname, timestamp } = req.body;
  try {
    const messages = await modelMessages.createMessageModel(message, nickname, timestamp);
    console.log(messages);
    return res.status(201).json({ message: 'mensagem criada, com sucesso' });
  } catch (err) {
    console.log(err.message);
  }
};

const updateMessage = async (req, res) => {
  const { nickname, oldNick } = req.body;
  try {
    const messages = await modelMessages.updateMessage(nickname, oldNick);
    console.log(messages);
    return res.status(201).json({ message: 'mensagem criada, com sucesso' });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getAll, createMessage, updateMessage };