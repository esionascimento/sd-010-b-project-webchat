const users = [];

const removeUser = (id) => {
  const cli = users.findIndex((el) => el.id === id);
  users.splice(cli, 1);
  return users;
};

const addUser = (id, user) => {
  const currUser = { id, nick: user };
  users.push(currUser);

  return users;
};

const updateUser = (id, user) => {
  console.log(users);
  const currUser = users.findIndex((el) => el.id === id);
  users[currUser].nick = user.nickname;

  return users;
};

const getAllUsers = () => users;

module.exports = { removeUser, addUser, updateUser, getAllUsers };
