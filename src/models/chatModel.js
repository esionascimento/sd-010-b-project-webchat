const connection = require('./connection');

const chatUpdate = async ({ nickname, chatMessage }) => {
  const webchat = await connection();
  const user = await webchat.collection('webchat');

  const { insertedId: _id } = await user.findAndUpdate({ nickname }, { chatMessage });

  return {
    _id,
    nickname,
    chatMessage,
  };
};

module.exports = {
  chatUpdate,
};
