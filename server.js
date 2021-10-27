require('dotenv').config();
const CustomExpress = require('./src/config/CustomExpress');

class Server {
  constructor() {
    this.port = process.env.PORT || 3000;
    this.express = CustomExpress;
  }

  start() {
    this.express.listen(this.port, () => {
      console.log(`Server up and running on port ${this.port}`);
    });
  }
}

new Server().start();
