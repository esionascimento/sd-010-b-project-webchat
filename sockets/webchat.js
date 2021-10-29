const webChat = require('../controllers');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    io.emit('users', await webChat.getDataOnConnect({ id: socket.id, nickname: undefined }));
    socket.on('message', async ({ nickname, chatMessage }) => {
      io.emit('message', await webChat.sendMessage(nickname, chatMessage));
    });
    socket.on('changeNickname', (nickname) => {
      io.emit('users', webChat.changeNickname(socket.id, nickname));
    });
    socket.on('disconnect', () => {
      io.emit('users', webChat.removeFromUsersArray(socket.id));
    });
  });
};