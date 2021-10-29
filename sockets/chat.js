// Renato - https://github.com/tryber/sd-010-b-project-webchat/pull/66/files
const data = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

const hora = () => {
  const date = new Date();
  let minutos = date.getMinutes();

  if (minutos < 10) { minutos = `0${minutos}`; }
  return `${date.getHours()}:${minutos}:${date.getSeconds()}`; 
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.emit('login', `Seja bem vindo ao TryB-X Webchat, voce esta conectado como - ${socket.id}`);
  socket.broadcast.emit('newlogin', { usuario: socket.id });

  socket.on('message', ({ nickname = socket.id, chatMessage }) => {
    console.log(`${nickname} - Mensagem ${chatMessage}`, chatMessage);
    io.emit('message', `${data()} ${hora()} - ${nickname}: ${chatMessage}`);
  });
});