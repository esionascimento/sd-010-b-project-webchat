const Nickname = require('../helper');
const User = require('./models/User');
const UserList = require('./models/UserList');

class Socket {
  constructor() {
    this.userList = new UserList();
  }

  connect(io) {
    io.on('connection', (socket) => {
      const user = new User(Nickname.createRandomNickname(), socket.id);
      this.userList.add(user);

      io.emit('newConnection', this.userList.getUsers(), user);
      socket.on('disconnect', () => {
        this.userList.remove(socket.id);
      });

      socket.on('message', ({ nickname, chatMessage }) => {
        if (chatMessage) {
          const date = new Date().toLocaleString('en-GB');
          const formattedDate = date.replace(/\//g, '-');
          io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
        }
      });
    });
  }
}

module.exports = Socket;