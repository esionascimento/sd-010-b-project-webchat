const users = [];

const removeUser = (id) => {
  const cli = users.findIndex((el) => el.id === id);
  users.splice(cli, 1);
  return users;
};

const addUser = (id, user) => {
  const currUser = { id, nick: user };
  users.unshift(currUser);
  return users;
};

const updateUser = (id, user) => {
  const currUser = users.findIndex((el) => el.id === id);
  const newUser = { id, nick: user.nickname };
  users.splice(currUser, 1);
  users.unshift(newUser);

  return users;
};

const getAllUsers = () => users;

module.exports = { removeUser, addUser, updateUser, getAllUsers };
