const listUsers = [];

const newUser = (socketId, userName) => {
  const objUser = { id: socketId, name: userName };
  listUsers.push(objUser);
  console.log(listUsers.length);
  console.log(listUsers);
  return listUsers;
};

const removeUser = (socketId) => {
  // listUsers.forEach((user, index) => {
  //   if (user.id === socketId) {
  //     listUsers.splice(indexOf listUsers[index], 1);
  //     console.log('remove', listUsers)
  //   }
  // })
  const removeIndex = listUsers.findIndex((user) => user.id === socketId);
  listUsers.splice(removeIndex, 1);
  return listUsers;
};

module.exports = {
  newUser,
  removeUser,
};
