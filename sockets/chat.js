const { dateNow } = require('../helper/date');
const { add } = require('../models/chat');

const foundUser = (id, pessoas) => {
  let indexFound = 0;
  pessoas.forEach((pessoa, index) => {
    if (pessoa.id === id) {
      indexFound = index;
    }
  });
  return indexFound;
};

const dele = (socket, pessoas) => {
  if (pessoas[foundUser(socket.id, pessoas)] !== undefined) {
    socket.broadcast.emit('userOff', pessoas[foundUser(socket.id, pessoas)].nickname);
    pessoas.splice(foundUser(socket.id, pessoas), 1);
  }
};

const pessoas = [];
 module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userOn', (nickname) => {
    pessoas.push({ nickname, id: socket.id });
    io.emit('userOn', pessoas);
  });

  socket.on('disconnect', () => {
    dele(socket, pessoas);
  });

  socket.on('updateUserOn', (name) => {
    io.emit('updateUserOn', {
      newName: name, pastName: pessoas[foundUser(socket.id, pessoas)].nickname });
    pessoas[foundUser(socket.id, pessoas)] = { nickname: name, id: socket.id };
  });

  socket.on('message', async (message) => {
    io.emit('message', `${dateNow()} - ${message.nickname}: ${message.chatMessage}`);
    await add({ message: message.chatMessage, nickname: message.nickname });
  });
});