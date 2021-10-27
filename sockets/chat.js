const { removeUser, addUser, changeNickname } = require('../models/nicknameModel');

const createNickname = (io, socket) => {
    const nicknameId = socket.id.slice(0, 16);
    const databaseNickname = nicknameId;
    socket.emit('nicknameId', nicknameId);
     console.log(`${nicknameId} conectado!`);
     // socket.emit('currentNickname', currentNickname);
  
     const updatedOnlineUsers = addUser({ nicknameId, databaseNickname });
     socket.emit('databaseNickname', databaseNickname);
     io.emit('onlineUsers', updatedOnlineUsers);
     return nicknameId;
  };
  
  const nicknameChange = (io, socket, nicknameId) => {
     socket.on('newNickname', (nickname) => {
         const updatedOnlineUsers = changeNickname({ nicknameId, databaseNickname: nickname });
         io.emit('onlineUsers', updatedOnlineUsers);
     });
  };

module.exports = (io) => {
  io.on('connection', (socket) => {
  const nicknameId = createNickname(io, socket);

  nicknameChange(io, socket, nicknameId);

  socket.on('message', (msg) => {
    console.log(`${socket.id}: ${msg}`);
    io.emit('message', { message: msg });
  });
  socket.broadcast.emit('message', { message: 'conection done' });

  socket.on('disconnect', () => {
    const updatedOnlineUsers = removeUser(nicknameId);
     io.emit('onlineUsers', updatedOnlineUsers);
  });
});
};
