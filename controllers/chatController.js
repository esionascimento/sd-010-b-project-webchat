const status = require('http-status');
const chat = require('../models/chat');

// const saveMessage = async (req, res) => {
//   const { message, nickname } = req.body;
//   // console.log(req.body, message, nickname);
//   try {
//     await chat.add(message, nickname, dateNow());
//     res.status(status.CREATED);
//     // console.log('aqui');
//   } catch (e) {
//     return e;
//   }
// };

const getMessages = async (_req, res) => {
  const messages = await chat.getAll();
  // console.log(messages);
  res.status(status.OK).render('chat/index', { messages });
};

module.exports = { getMessages };