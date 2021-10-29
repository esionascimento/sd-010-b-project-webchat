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
    pessoas.push({ nickname: nickname.name, id: socket.id, color: nickname.color });
    console.log(pessoas);
    io.emit('userOn', pessoas);
  });

  socket.on('disconnect', () => {
    dele(socket, pessoas);
  });

  socket.on('updateUserOn', (name) => {
    io.emit('updateUserOn', {
      newName: name, pastName: pessoas[foundUser(socket.id, pessoas)].nickname });
    pessoas[foundUser(socket.id, pessoas)] = { nickname: name, id: socket.id, color: pessoas[foundUser(socket.id, pessoas)].color };
  });

  socket.on('message', (message) => {
    // await add(message.chatMessage, message.nickname, dateNow());
    io.emit('message', { 
      date: dateNow(), pessoa: pessoas[foundUser(socket.id, pessoas)], message: message.chatMessage });
    console.log(message);
  });
});