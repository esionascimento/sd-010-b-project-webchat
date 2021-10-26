module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    const { chatMessage, nickname } = message;
    const data = new Date();
    const dataForm = (data.getDate(), '-', ((data.getMonth() + 1)), '-', (data.getFullYear()));
    const time = (data.getHours(), ':', ((data.getMinutes() + 1)), ':', (data.getSeconds()));
    io.emit('message', `${dataForm} ${time} - ${nickname}: ${chatMessage}`);
  });
});
