const connection = require('../util/database/Mongo');
const Nickname = require('../helper');
const { Message } = require('../models');
const User = require('./models/User');
const UserList = require('./models/UserList');

class Socket {
  constructor(io) {
    this.userList = new UserList();
    this.messageModel = new Message(connection);
    this.io = io;
  }

  async connect() {
    this.io.on('connection', async (socket) => {
      this.newConnection(socket);
      this.message(socket);
      this.updateNickname(socket);
    });
  }

  async newConnection(socket) {
      this.newUserConnected(socket);
      await this.showSavedMessages(socket);
      socket.on('disconnect', () => {
        this.userList.remove(socket.id);
        socket.broadcast.emit('newConnection', this.userList.getUsers());
      });
  }

  async message(socket) {
    socket.on('message', async ({ nickname, chatMessage }) => {
      if (chatMessage) {
        const date = new Date().toLocaleString('en-GB');
        const formattedDate = date.replace(/\//g, '-');
        await this.messageModel.insertMessage({ chatMessage, nickname, formattedDate });
        this.io.emit('message', `${formattedDate} - ${nickname}: ${chatMessage}`);
      }
    });
  }

  updateNickname(socket) {
    socket.on('triggerUpdate', (newNickname) => {
      this.userList.update(socket.id, newNickname);
      this.io.emit('updateUserIncoming');
    });
    socket.on('updateUserIncoming', () => {
        socket.emit('updateNickname', 
         this.userList.getUsers(),
         this.userList.getUser(socket.id));
    });
  }

  newUserConnected(socket) {
    const user = new User(Nickname.createRandomNickname(), socket.id);
    this.userList.add(user);
    this.io.emit('newUserJoined');
    socket.on('newConnection', () => {
      socket.emit('newConnection', this.userList.getUsers(), user);
    });  
  }

  async showSavedMessages(socket) {
    const messages = await this.messageModel.getMessages();
    socket.emit('renderMessages', messages);
  }
}

module.exports = Socket;