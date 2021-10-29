const model = require('../models/messages');

const getAllMessages = async (req, res) => {
  try {
    const messages = await model.getAllMessages();
    res.status(200).render('chat', { messages });
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  getAllMessages,
};
