const chatModel = require('../../models/chatModel');

const chatUpdate = async (req, res) => {
  const { dateNow, nickname, chatMessage } = req.body;

  const user = await chatModel
    .chatUpdate({ dateNow, nickname, chatMessage });

  if (user === 'emailExist') {
    return res.status(409).json({ message: 'Email already registered' });
  }

  res.status(201).json({ user });
};

module.exports = {
  chatUpdate,
};
