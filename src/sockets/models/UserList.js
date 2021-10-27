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

  update(id, nickName) {
    const index = this.list.findIndex((user) => user.id === id);
    this.list[index].nickName = nickName;
    return this.list[index];
  }
}

module.exports = UserList;