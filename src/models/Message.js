const Constants = require('../constants/Constants');

class Message {
  constructor(connection) {
    this.connection = connection;
    this.collection = Constants.MESSAGE_COLLECTION;
  }

  async insertMessage({ chatMessage, nickname, formattedDate }) {
    const db = await this.connection();
    const newMessage = {
      message: chatMessage,
      nickname,
      timestamp: formattedDate,
    };
    await db.collection(this.collection)
      .insertOne(newMessage);
  }

  async getMessages() {
    const db = await this.connection();
    const messages = await db.collection(this.collection).find({}).toArray();
    return messages.map(({ message, nickname, timestamp }) => ({
      message,
      nickname,
      timestamp,
    }));
  }
}

module.exports = Message;