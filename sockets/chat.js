const model = require('../models/chatModel');

const onlineUsers = [];

const insertMessageinDB = (data) => {
  const time = new Date();
  const today = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
  const moment = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  const serverReturn = `${today} ${moment} - ${data.nickname}: ${data.chatMessage}`;
  model.insertMessage({
    message: data.chatMessage,
    nickname: data.nickname,
    timestamp: `${today} ${moment}`,
  });
  return serverReturn;
};

const removeUserFromOnlineUsers = (socketId) => {
  const userInfo = onlineUsers.find((user) => user.socketId === socketId);
    const userInfoIndex = onlineUsers.indexOf(userInfo);
    if (userInfoIndex > -1) {
      onlineUsers.splice(userInfoIndex, 1);
    }
};

const updateUserNickname = (socketId, newNickname) => {
  const userInfo = onlineUsers.find((user) => user.socketId === socketId);
  const userInfoIndex = onlineUsers.indexOf(userInfo);
  onlineUsers[userInfoIndex] = { socketId, nickname: newNickname };
};

module.exports = async (io) => io.on('connection', async (socket) => {
  const messagesInfo = await model.getAllMessages();
  const messagesList = messagesInfo.map((m) => `${m.timestamp} - ${m.nickname}: ${m.message}`);
  socket.emit('messagesList', messagesList);
  socket.on('newUserNickname', (nickname) => {
    onlineUsers.push({ socketId: socket.id, nickname });
    io.emit('onlineUsers', onlineUsers);
  });
  socket.on('updateNickname', (newNickname) => {
    updateUserNickname(socket.id, newNickname);
    io.emit('onlineUsers', onlineUsers);
  });
  socket.on('message', (data) => {
    const serverReturn = insertMessageinDB(data);
    io.emit('message', serverReturn);
  });
  socket.on('disconnecting', () => {
    removeUserFromOnlineUsers(socket.id);
    io.emit('onlineUsers', onlineUsers); 
  });
});