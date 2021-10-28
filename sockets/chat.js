const usersOnline = [];

const renameUser = (newName, defaultName, userRenamed) => {
  const name = userRenamed || defaultName;

  usersOnline.splice(usersOnline.indexOf(name), 1, newName);
};

module.exports = (io) => io.on('connection', (socket) => {
  const defaultName = `user-${socket.id.slice(0, 11)}`;
  let userRenamed = null;

  usersOnline.push(defaultName);

  socket.emit('setName', defaultName);
  io.emit('usersOnline', usersOnline);

  socket.on('renameUser', (newName) => {
    renameUser(newName, defaultName, userRenamed);
    userRenamed = newName;
    
    io.emit('usersOnline', usersOnline);
  });

  socket.on('disconnect', () => {
    const name = userRenamed || defaultName;
    usersOnline.splice(usersOnline.indexOf(name), 1);
    
    io.emit('usersOnline', usersOnline);
  });
});
