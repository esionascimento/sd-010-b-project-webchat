class UserList {
  constructor() {
    this.list = [];
  }
  
  getUsers() {
    return this.list.map((user) => ({
        userId: user.userId,
        nickName: user.nickName,
      }));
  }

  getUser(id) {
    const index = this.list.findIndex((user) => user.userId === id);
    return this.list[index];
  }

  getSortedUsers(id) {
    const list = [...this.list];
    const index = list.findIndex((user) => user.userId === id);
    const currentUser = this.list[index];
    if (currentUser) {
      list.splice(index, 1);
      const newList = [currentUser, ...list];
      return newList;
    }
    return list;
  }

  add(user) {
    this.list.push(user);
  }

  remove(id) {
    this.list = this.list.filter((user) => user.userId !== id);
  }

  update(id, nickName) {
    if (!nickName) return;
    const index = this.list.findIndex((user) => user.userId === id);
    this.list[index].nickName = nickName;
    return this.list[index];
  }
}

module.exports = UserList;