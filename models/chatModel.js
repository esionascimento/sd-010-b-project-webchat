const connection = require('./connection');

const chatUpdate = async ({ dateNow, nickname, chatMessage }) => {
  const webchat = await connection();
  const user = await webchat.collection('webchat');

  const { insertedId: _id } = await user.findAndUpdate({ nickname }, { dateNow, chatMessage });

  return {
    _id,
    nickname,
    dateNow,
    chatMessage,
  };
};

module.exports = {
  chatUpdate,
};
