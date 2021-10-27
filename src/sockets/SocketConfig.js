class SocketConfig {
  constructor() {
    this.getConfig = {
      cors: {
        origin: 'http://localhost:3000/',
        methods: ['GET', 'POST'],
      },
    };
  }
}

module.exports = new SocketConfig().getConfig;