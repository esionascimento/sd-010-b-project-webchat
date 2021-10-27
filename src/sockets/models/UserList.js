class UserList {
  constructor() {
    this.list = [];
  }

  getUsers() {
    return this.list.map((user) => ({
        userId: user.id,
        nickName: user.nickName,
      }));
  }

  add(user) {
    this.list.push(user);
  }

  remove(id) {
    this.list = this.list.filter((user) => user.id !== id);
  }
}

module.exports = UserList;