const webChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('conectado', (params) => {
      console.log(`Usuário: ${params}`);
    });
  });
};

module.exports = webChat;