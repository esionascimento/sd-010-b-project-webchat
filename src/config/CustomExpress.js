const express = require('express');
const path = require('path');
const http = require('http');

class CustomExpress {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.config();
  }

  config() {
    this.app.use(express.static(path.resolve(__dirname, '../', 'views')));
  }
}

module.exports = new CustomExpress().app;
