//
const ChatModel = require('../models/chat');

let nicknames = [];

const nickOnLogin = (nickname, io, socket) => {
  nicknames.push({ id: socket.id, nickname });
  const onlyNicknames = nicknames.map(({ nickname: nick }) => nick);
  io.emit('updateNicknames', onlyNicknames);
};

const changeNicknames = (oldNick, newNick, io, socket) => {
  nicknames = nicknames.map(({ nickname, id }) => {
    if (oldNick === nickname && id === socket.id) {
      return { nickname: newNick, id };
    }
      return { nickname, id };
  });
  const onlyNicknames = nicknames.map(({ nickname: nick }) => nick);
  io.emit('updateNicknames', onlyNicknames);
  io.emit('message', `${oldNick} alterou seu nick para ${newNick}`);
};

const disconnect = (io, socket) => {
  const offline = nicknames.find(({ id }) => id === socket.id);
  nicknames = nicknames.filter(({ id }) => id !== socket.id);
  // traz apenas sockets conectados
  const onlyNicknames = nicknames.map(({ nickname: nick }) => nick);
  io.emit('updateNicknames', onlyNicknames);
  if (offline) return io.emit('message', `${offline.nickname} saiu`);
};

const sendMsg = async (chatMessage, nickname, io) => {
  const formatMsg = {
    date: new Date().toLocaleString('en-US').replaceAll('/', '-').replace(',', ''),
    chatMessage,
    nickname,
  };
  io.emit('message', `${formatMsg.date} - ${formatMsg.nickname}: ${formatMsg.chatMessage}`);
  await ChatModel.saveMessage(formatMsg.chatMessage, formatMsg.nickname, formatMsg.date);
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userLogin', (username) => {
    if (!username) return false;
    nickOnLogin(username, io, socket);

    socket.emit('userConnect', username);

    // socket.emit('message', `Bem vindo ao chat ${username}`);

    socket.broadcast.emit('message', `${username} acabou de entrar na sala`);
  });

  socket.on('changeNicknames', 
    ({ oldNick, newNick }) => changeNicknames(oldNick, newNick, io, socket));

  socket.on('message', ({ nickname, chatMessage }) => {
    sendMsg(chatMessage, nickname, io); 
  });

  socket.on('disconnect', () => disconnect(io, socket));
});
