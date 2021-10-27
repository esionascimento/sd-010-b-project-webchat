const Nickname = require('../helper');
const User = require('./models/User');
const UserList = require('./models/UserList');

class Socket {
  constructor(io) {
    this.userList = new UserList();
    this.io = io;
  }

  connect() {
    this.io.on('connection', (socket) => {
      this.newConnection(socket);
      this.message(socket);
      this.updateNickname(socket);
    });
  }

  newConnection(socket) {
    const user = new User(Nickname.createRandomNickname(), socket.id);
    this.userList.add(user);
    this.io.emit('newConnection', this.userList.getUsers(), user);
      socket.on('disconnect', () => {
        this.userList.remove(socket.id);
      });
  }

  message(socket) {
    socket.on('message', ({ nickname, chatMessage }) => {
      if (chatMessage) {
        const date = new Date().toLocaleString('en-GB');
        const formattedDate = date.replace(/\//g, '-');
        this.io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
      }
    });
  }

  updateNickname(socket) {
    socket.on('updateNickname', (newNickname) => {
      if (newNickname) {
        const updatedUser = this.userList.update(socket.id, newNickname);
        this.io.emit('updateNickname', this.userList.getUsers(), updatedUser);
      }
    });
  }
}

module.exports = Socket;