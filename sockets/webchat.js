const { saveMessage, getAll } = require('../models/webchatModel');

const BellowTen = (number) => (number < 10 ? `0${number}` : number);

const getNow = () => {
  const date = new Date();
  const DD = BellowTen(date.getDate());
  const MM = BellowTen(date.getMonth() + 1);
  const yyyy = BellowTen(date.getFullYear());
  const HH = BellowTen(date.getHours());
  const mm = BellowTen(date.getMinutes());
  const ss = BellowTen(date.getSeconds());
  
  return `${DD}-${MM}-${yyyy} ${HH}:${mm}:${ss}`;
};

const buildFullMessage = (timestamp, nickname, message) => `${timestamp} - ${nickname}: ${message}`;

const processdbMessagens = (oldMessages) => oldMessages
  .map(({ timestamp, nickname, message }) => buildFullMessage(timestamp, nickname, message));

let count = 0;
// moment

module.exports = (io) => io.on('connection', async (socket) => {
  count += 1;
  const nicknames = `User ${count}`;
  const Room = 'public';

  console.log(`${nicknames} se conectou a sala !`);
  socket.join(Room);

  socket.on('message', async ({ chatMessage: message, room = Room, nickname }) => {
    const timestamp = getNow();
    await saveMessage({ message, nickname, timestamp });
    io.to(room).emit('message', buildFullMessage(timestamp, nickname, message));
  });

  const { messages: oldMessages } = await getAll();
  // console.log(oldMessages);
  socket.emit('LoadOldMessages', { oldMessages: processdbMessagens(oldMessages) });

  // socket.emit('wellCome', `Bem vindo ${nickname}`);

  // socket.broadcast.to(Room)
  //   .emit('entryRoom', `${nickname} acabou de entrar na sala`);

  socket.on('disconnect', () => {
    socket.broadcast.to(Room)
      .emit('outRoom', `${nicknames} acabou de sair na sala`);
  });
});
