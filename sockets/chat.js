// let guestId = 0;

// const generateUser = () => {
//   guestId += 1;
//   return `Guest ${guestId}`;
// };

module.exports = (io) => io.on('connection', (socket) => {
  // socket.emit('ola', `Seja bem vindo ao nosso chat público! ${nickName}`);
  
  const dateNow = new Date().toLocaleString().replaceAll('/', '-');
  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${dateNow} ${nickname}: ${chatMessage}`);
  });

  // socket.on('nickName', (nick) => {
  //   io.emit('userName', nick);
  // });
});