const { getDate } = require('../utils/chatFuctions');

let allUsers = [];
const disconnect = (socket, io) => {
  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
    allUsers = allUsers.filter((user) => user.id !== socket.id);
    io.emit('loggedUsers', allUsers);
  });
};
const changeUser = (socket, io) => {
  socket.on('changeUser', (currentUser) => {
    const index = allUsers.findIndex((user) => user.id === socket.id);
    allUsers[index].username = currentUser;
    io.emit('loggedUsers', allUsers);
  });
};
const newMessage = (socket, io) => {
  socket.on('message', (message) => {
    const date = getDate();
    const messageAlready = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', messageAlready);
  });
};

const newConnection = (socket, io) => {
  console.log(`Novo usuário conectado: ${socket.id}`);
  socket.on('newUser', (randomUser) => {
    allUsers.push({ id: socket.id, username: randomUser });
    io.emit('loggedUsers', allUsers);
  });
};

const connection = (io) => {
  io.on('connection', (socket) => {
    newConnection(socket, io);
    newMessage(socket, io);
    changeUser(socket, io);
    disconnect(socket, io);
  });
};

module.exports = connection;