const express = require('express');
const path = require('path');
const http = require('http');
const baseSocket = require('socket.io');
const { socketConfig, Socket } = require('../sockets');

class CustomExpress {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = baseSocket(this.server, socketConfig);
    this.socketInstance = new Socket(this.io);

    this.config();
  }

  config() {
    this.routes();
    this.socket();
  }

  routes() {
    this.app.use('/static', express.static(path.resolve('static')));
    this.app.use(express.static(path.resolve(__dirname, '../', 'views')));
  }

  socket() {
    this.socketInstance.connect();
  }
}

module.exports = new CustomExpress().server;
