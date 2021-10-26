const chat = (io) => {
  io.on('connection', (socket) => {
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