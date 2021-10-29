const { saveMessage, getAll } = require('../models/webchatModel');

// let controlNickName = '';

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

const Room = 'public';
const onlineUsers = [];

const updateUserList = (io, oldNick, nickname) => {
  const indexToReplace = onlineUsers.indexOf(oldNick);
  onlineUsers[indexToReplace] = nickname;
  io.to(Room).emit('updateUserList', onlineUsers);
};

const disconnect = (io, nickname) => {
  onlineUsers.splice(onlineUsers.indexOf(nickname), 1);
  io.to(Room).emit('updateUserList', onlineUsers);
  io.to(Room).emit('message', `${nickname} se desconectou!`);
};

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`${socket.id} se conectou a sala !`);
  socket.join(Room);
  
  socket.on('addUserList', ({ nickname }) => {
    onlineUsers.push(nickname);
    io.to(Room).emit('updateUserList', onlineUsers);
    socket.broadcast.emit('conectUser', nickname);
  });

  socket.on('updateUserList', ({ oldNick, nickname }) => updateUserList(io, oldNick, nickname));

  socket.on('message', async ({ chatMessage: message, room = Room, nickname }) => {
    const timestamp = getNow();
    await saveMessage({ message, nickname, timestamp });
    io.to(room).emit('message', buildFullMessage(timestamp, nickname, message));
  });
  
  const { messages: oldMessages } = await getAll();
  socket.emit('LoadOldMessages', { oldMessages: processdbMessagens(oldMessages) });
  
  socket.on('disconnect', () => disconnect(io, 'User'));
  // socket.on('saiu', (nick) => disconnect(io, nick));
});
