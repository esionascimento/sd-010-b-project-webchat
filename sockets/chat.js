const messagesList = [];
module.exports = (io) => io.on('connection', (socket) => {
  io.emit('messagesList', messagesList);
  socket.on('message', (data) => {
    const time = new Date();
    const today = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
    const moment = `${time.getHours()}:${time.getMinutes()}`;
    const serverReturn = `${today} ${moment} - ${data.nickname}: ${data.chatMessage}`;
    messagesList.push(serverReturn);
    io.emit('message', serverReturn);
  });
});