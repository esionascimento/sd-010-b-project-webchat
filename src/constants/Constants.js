class Constants {
  constructor() {
    this.getConstants = {
      SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000/',
      GET: 'GET',
      POST: 'POST', 
      MESSAGE_COLLECTION: 'messages',
    };
  }
}

module.exports = new Constants().getConstants;