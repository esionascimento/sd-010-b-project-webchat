/* const { create } = require('./controllers/chatController'); */

const user = {
};
const usersLogados = [];

module.exports = (io) => 
  io.on('connection', (socket) => {
    const nameAleatorio = socket.id.slice(0, 16);
    usersLogados.push(nameAleatorio);

    io.emit('nomeAleatorio', usersLogados);
    socket.on('salveUserr', (name) => {
      user.name = name;
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      /* https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
      https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript */
      const d = new Date();
      const data = d.toISOString().substr(0, 10).split('-').reverse()
      .join('-');
      const horas = d.toLocaleTimeString();
      user.nickname = nickname;
      user.data = `${data} ${horas}`;
      user.chatMessage = chatMessage;
      /* io.emit('message', user); */
      io.emit('message', `${user.data} - ${nickname} : ${chatMessage}`);
    });
  });
