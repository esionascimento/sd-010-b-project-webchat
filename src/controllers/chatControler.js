const chatService = require('../service/chatService');

const chatUpdate = async (req, res) => {
  const { nickname, chatMessage } = req.body;

  const user = await chatService
    .chatUpdate({ nickname, chatMessage });

  if (user === 'emailExist') {
    return res.status(409).json({ message: 'Email already registered' });
  }

  res.status(201).json({ user });
};

module.exports = {
  chatUpdate,
};
