class User {
  constructor(nickname, id) {
    this.id = id;
    console.log(nickname);
    this.nickName = nickname;
  }
}

module.exports = User;