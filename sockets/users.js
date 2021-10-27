const nicks = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('nickname', (nick) => {
      nicks.push(nick);
      io.emit('nickname', nicks);
    });

    socket.on('newNickname', ({ newNick, nickname }) => {
      const findIndexUser = nicks.findIndex((user) => user === nickname);
      nicks[findIndexUser] = newNick;
      io.emit('nickname', nicks);
    });
  });
}; 