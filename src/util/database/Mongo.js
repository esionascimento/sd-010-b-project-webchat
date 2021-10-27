const { MongoClient } = require('mongodb');
require('dotenv').config();

class Mongo {
  constructor() {
    this.db = null;
    this.config = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.connect = this.connect.bind(this);
  }

  async connect() {
    if (this.db) return Promise.resolve(this.db);
    return MongoClient
      .connect(process.env.DB_URL, this.config)
      .then((conn) => conn.db(process.env.DB_NAME))
      .then((dbSchema) => {
        this.db = dbSchema;
        return this.db;
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }
}

module.exports = new Mongo().connect;
