const models = require('../models/messages');

/** SOURCE https://www.youtube.com/watch?v=Hr5pAAIXjkA */
const generateNickname = () => {
  let nickname = '';
  do {
    nickname += Math.random().toString(36).substr(2);
  } while (nickname.length < 16);
  nickname = nickname.substr(0, 16);
  return nickname;
};

/* SOURCE https://stackoverflow.com/questions/42862729/convert-date-object-in-dd-mm-yyyy-hhmmss-format
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString */

const createMessage = ({ chatMessage, nickname }) => {
  const date = new Date().toLocaleString('en-US');
  return `${date} - ${nickname}: ${chatMessage}`.replace(/\//g, '-');
};

const users = [];

const onUserConnection = async (io, socket, userNickname) => {
  socket.emit('saveNickname', userNickname); 
  io.emit('onlineUsers', userNickname);
  
  if (users.length > 0) users.forEach((user) => socket.emit('onlineUsers', user));
  users.push(userNickname);
};

module.exports = (io) => io.on('connection', async (socket) => {
  let userNickname = generateNickname();
  onUserConnection(io, socket, userNickname);

  socket.on('message', async ({ chatMessage, nickname }) => {
    const msg = createMessage({ chatMessage, nickname });
    io.emit('message', msg);
    await models.saveMessages({ chatMessage, nickname });
  });

  socket.on('updateNickname', ({ previousNickname, atual }) => {
    users.splice(previousNickname, 1, atual);
    userNickname = atual;
    io.emit('updateNickname', { previousNickname, atual });
  });

  socket.on('disconnect', () => {
    users.splice(userNickname, 1); io.emit('offLineUser', userNickname);
  });
});