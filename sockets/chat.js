const onlineList = [];

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
    io.emit('online', onlineList);
  });
};

const chat = (io) => {
  io.on('connection', (socket) => {
    newUser(socket, io);
    editUser(socket, io);
    console.log(`Um usuário conectou em ${socket.id}`); // baseado na documentação
    socket.on('disconnect', () => {
      console.log(`um usuário desconectou em ${socket.id}`);  
    });
    socket.on('message', (message) => {
      const messageDate = new Date();
      const messageTime = messageDate.toLocaleTimeString();
      const messageDateFormatted = messageDate.toLocaleDateString().replaceAll('/', '-');
      const messageFormatted = `${messageDateFormatted} ${messageTime}
       - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', messageFormatted);
    });
  }); 
};

module.exports = chat;