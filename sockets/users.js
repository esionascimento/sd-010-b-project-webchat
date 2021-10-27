let nicks = [];

module.exports = (io) => {
  io.on('connection', (socket) => {
    let userName;
    socket.on('nickname', (nick) => {
      userName = nick;
      nicks.push(nick);
      io.emit('nickname', nicks);
    });

    socket.on('newNickname', ({ newNick, nickname }) => {
      const findIndexUser = nicks.findIndex((user) => user === nickname);
      nicks[findIndexUser] = newNick;
      userName = newNick;
      io.emit('nickname', nicks);
    });

    socket.on('disconnect', () => {
      nicks = nicks.filter((user) => user !== userName);
      io.emit('nickname', nicks);
    });
  });
}; 