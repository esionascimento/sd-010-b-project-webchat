class UserList {
  constructor() {
    this.userList = [];
  }

  getUsers() {
    return this.userList.map((user) => ({
        userId: user.id,
        nickName: user.nickName,
      }));
  }

  add(user) {
    this.userList.push(user);
  }

  remove(id) {
    this.userList = this.userList.filter((user) => user.id !== id);
  }
}

module.exports = UserList;