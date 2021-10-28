const listUsers = [];

const newUser = (socketId, userName) => {
  if (listUsers.length > 0) {
    const userExist = listUsers.findIndex((user) => user.id === socketId);

    if (userExist !== -1) {
      listUsers[userExist].name = userName;
      return listUsers;
    }

    const objUser = { id: socketId, name: userName };
    listUsers.push(objUser);
    // console.log(listUsers.length);
    // console.log(listUsers);
    return listUsers;
  }

  const objUser = { id: socketId, name: userName };
    listUsers.push(objUser);
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
