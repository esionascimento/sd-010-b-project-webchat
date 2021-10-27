const onlineList = [];

const modelChat = require('../models/modelChat');

const newUser = (socket, io) => {
  socket.on('new-user', (user) => {
    onlineList.push({ id: socket.id, nickname: user });
    console.log(onlineList);
    io.emit('online', onlineList);
  });
};

const editUser = (socket, io) => {
  socket.on('edit-user', (user) => {
    console.log(user);
    const userIndex = onlineList.findIndex((item) => item.id === socket.id);
    onlineList[userIndex].nickname = user;
    console.log(onlineList);
    io.emit('online', onlineList);
  });
};

const offlineUser = (socket, io) => {
  socket.on('disconnect', () => {
    console.log(`um usuário desconectou em ${socket.id}`); 
    const userIndex = onlineList.findIndex((item) => item.id === socket.id);
    onlineList.splice(userIndex, 1);
    console.log(onlineList);
    io.emit('online', onlineList);
  });
};

const messageFunc = (socket, io) => {
  socket.on('message', async (message) => {
    const messageDate = new Date();
    const messageTime = messageDate.toLocaleTimeString();
    const messageDateFormatted = messageDate.toLocaleDateString().replaceAll('/', '-');
    const messageFormatted = `${messageDateFormatted} ${messageTime}
     - ${message.nickname}: ${message.chatMessage}`;
     await modelChat.insertMessage(
      { nickname: message.nickname, 
        message: message.chatMessage,
         timestamp: `${messageDateFormatted} ${messageTime}` },
);
    io.emit('message', messageFormatted);
  });
};

const chat = async (io) => {
  io.on('connection', (socket) => {
    newUser(socket, io);
    editUser(socket, io);
    console.log(`Um usuário conectou em ${socket.id}`); // baseado na documentação
    offlineUser(socket, io);
    messageFunc(socket, io);
  }); 
};

module.exports = chat;