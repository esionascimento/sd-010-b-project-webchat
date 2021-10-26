const getNow = () => {
  const date = new Date();
  const DD = date.getDate();
  const MM = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const HH = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  
  return `${DD}-${MM}-${yyyy} ${HH}:${mm}:${ss}`;
};

let count = 0;
// moment

module.exports = (io) => io.on('connection', (socket) => {
  count += 1;
  const nicknames = `User ${count}`;
  const Room = 'public';

  console.log(`${nicknames} se conectou a sala !`);
  socket.join(Room);

  socket.on('message', ({ chatMessage: message, room = Room, nickname }) => {
    io.to(room)
    .emit('message', `${getNow()} - ${nickname}: ${message}`);
  });

  // socket.emit('wellCome', `Bem vindo ${nickname}`);

  // socket.broadcast.to(Room)
  //   .emit('entryRoom', `${nickname} acabou de entrar na sala`);

  socket.on('disconnect', () => {
    socket.broadcast.to(Room)
      .emit('outRoom', `${nicknames} acabou de sair na sala`);
  });
});
