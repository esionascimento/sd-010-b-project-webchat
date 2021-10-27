const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

class Nickname {
  static createRandomNickname() {
    return uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  }
}

module.exports = Nickname;