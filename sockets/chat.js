const moment = require('moment');
const CreateMessage = require('../models/chat');
// https://momentjs.com/
// https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/
moment.defaultFormat = 'DD-MM-yyyy HH:mm:ss';

let users = [];

const userList = (socket, io) => {
  socket.on('userNickname', (nickname) => {
    users.push(nickname);
    io.emit('users', users);
  });
};

const createMessage = async (io, socket, timestamp) => {
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = chatMessage;
    await CreateMessage.create({ message, nickname, timestamp });
    io.emit('message', `${timestamp} - ${nickname}: ${message}`);
  });
};

const getMessages = async () => CreateMessage.getAllMessages()
  .then((db) =>
    db.map(({ message, nickname, timestamp }) => `${timestamp} ${nickname} ${message}`));

  const timestamp = moment().format();

module.exports = (io) => io.on('connection', async (socket) => {
  createMessage(io, socket, timestamp);

  userList(socket, io);
  const allMessages = await getMessages();

  socket.emit('messages', allMessages);
  let user = '';
  user = socket.id.slice(0, 16);

  socket.emit('connected', user);
  console.log(`Usuario ${users} se conectou.`);

  socket.on('updateNickname', (nickname) => {
    users = users.map((name) => (name === user ? nickname : name));
    user = nickname;
    io.emit('users', users);
  });
// https://oieduardorabelo.medium.com/node-js-usando-websockets-5d642456d1f3
  socket.on('disconnect', () => {
    const usersArray = users.findIndex((item) => item === user);
    users.splice(usersArray, 1);
    // Fiz a remocao do user com ajuda do Zozimo <3
    io.emit('users', users);
  });
});