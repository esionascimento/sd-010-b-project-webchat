const webChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('conectado', () => {
      io.emit('usuario', 'Usuário conectado');
    });
  });
};

module.exports = webChat;