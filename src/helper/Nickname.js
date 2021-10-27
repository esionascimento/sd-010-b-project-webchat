class Nickname {
  static createRandomNickname() {
    let text = '';
    const nickLength = 16;
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < nickLength; i += 1) {
      text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return text;
  }
}

module.exports = Nickname;