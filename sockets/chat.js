module.exports = (io) =>
  io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('clientMessage', (message) => {
      console.log(`Mensagem ${message}`);
      io.emit('serverMessage', message);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
    });
  });
