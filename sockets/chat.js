module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);

    // Mensagem de boas vindas ao usuário atual
    socket.emit('message', 'Bem vindos ao TrybeChat!');

    // Mensagem que um novo usário entrou no chat
    socket.broadcast.emit('message', `${socket.id} Entrou no chat`);

    // Mensagem que o usário saiu do chat
    socket.on('disconnect', () => {
      io.emit('message', `${socket.id} Saiu do chat`);
    });
  });
};