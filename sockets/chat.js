const { removeUser, addUser, changeNickname } = require('../models/nicknameModel');
const { createMessages } = require('../controllers/webchatController');

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

  const messageReturn = (io, socket) => {
    socket.on('message', async (msg) => {
      const { chatMessage, nickname } = msg;

      const date = new Date();
      const BrazilDate = date.toLocaleDateString().split('/');
      const dayMonthYear = `${BrazilDate[1]}-${BrazilDate[0]}-${BrazilDate[2]}`;
      const hourMinute = ` ${date.getHours()}:${date.getMinutes()}`;
      const finalDate = `${dayMonthYear} ${hourMinute}`;
      await createMessages({ chatMessage, nickname, finalDate });

      const formattedMessage = `${finalDate} - ${nickname}: ${chatMessage}`;
      console.log(formattedMessage);

      io.emit('message', formattedMessage);
    });
  };

module.exports = (io) => {
  io.on('connection', (socket) => {
  const nicknameId = createNickname(io, socket);

  nicknameChange(io, socket, nicknameId);

  messageReturn(io, socket);

  socket.on('disconnect', () => {
    const updatedOnlineUsers = removeUser(nicknameId);
     io.emit('onlineUsers', updatedOnlineUsers);
  });
});
};
