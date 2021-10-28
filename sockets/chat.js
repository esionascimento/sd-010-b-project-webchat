/** SOURCE https://www.youtube.com/watch?v=Hr5pAAIXjkA */
const generateNickname = () => {
  let nickname = '';
  do {
    nickname += Math.random().toString(36).substr(2);
  } while (nickname.length < 16);
  nickname = nickname.substr(0, 16);
  return nickname;
};

const users = [];

module.exports = (io) => io.on('connection', (socket) => {
   const randomNickname = generateNickname();
  io.emit('generateNickname', randomNickname);
  if (users.length > 0) users.forEach((user) => socket.emit('onlineUsers', user));
  users.push(randomNickname);

  socket.on('message', ({ chatMessage, nickname }) => {
    /* SOURCE https://stackoverflow.com/questions/42862729/convert-date-object-in-dd-mm-yyyy-hhmmss-format
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString */
    const date = new Date();
    const msg = `${date.toLocaleString('en-US')} - ${nickname}: ${chatMessage}`.replace(/\//g, '-');
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    users.splice(randomNickname, 1);
    io.emit('offLineUser', randomNickname);
    console.log(`${randomNickname} saiu`);
  });
});