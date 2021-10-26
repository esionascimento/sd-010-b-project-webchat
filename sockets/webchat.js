module.exports = (io) => io.on('connection', (socket) => {
  const nickname = 'Fabio';
  // const Room = 'public';

  // socket.on('joinRoom', ({ username, room }) => {
  //   console.log(`${username} se conectou na sala ${room}!`);
  //   userName = username;
  //   Room = room;

  //   socket.join(room);

  //   socket.emit('serverMessage', `Bem vindo ${username} a sala sobre ${room}`);

  //   socket.broadcast.to(room).emit('serverMessage', `${username} acabou de entrar na sala`);

  //   socket.on('roomClientMessage', ({ message, roons }) => {
  //     io.to(roons)
  //     .emit('serverMessage', `${username}: ${message}`);
  //   });
  // });

  socket.on('disconnect', () => {
    console.log(`${nickname} se desconectou na sala !`);
    socket.broadcast.emit('serverMessage', `${nickname} acabou de sair na sala`);
  });
});