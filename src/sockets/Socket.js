const Nickname = require('../helper');
const User = require('../model/User');
const UserList = require('../model/UserList');

class Socket {
  constructor() {
    this.userList = new UserList();
  }

  connect(io) {
    io.on('connection', (socket) => {
      const user = new User(Nickname.createRandomNickname(), socket.id);
      this.userList.add(user);
      io.emit('username', this.userList.getUsers());
      socket.on('disconnect', () => {
        this.userList.remove(socket.id);
        socket.broadcast.emit('userDisconnected', socket.id);
      });
    });
  }
}

module.exports = Socket;