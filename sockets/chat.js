module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(`Mensagem de ${data.nickname}: ${data.message}`);
    const time = new Date();
    const today = `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
    const moment = `${time.getHours()}:${time.getMinutes()}`;
    const emission = { ...data, time: `${today} at ${moment}` };
    console.log(emission);
    io.emit('serverMessage', emission);
  });
});