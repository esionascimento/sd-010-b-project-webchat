const { getAllMessages } = require('../models');

const getMessages = async (_req, res) => {
  const messages = await getAllMessages();

  // index, é o arquivo EJS que esta dentro de views
  // render, faz a renderização da pagina
  res.status(200).render('index', { messages });
};

module.exports = {
  getMessages,
};