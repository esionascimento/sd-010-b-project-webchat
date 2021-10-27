module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log(`Mensagem de ${data.nickname}: ${data.message}`);
  });
});