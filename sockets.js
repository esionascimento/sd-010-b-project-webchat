const { create, getAll } = require('./controllers/chatController');

/* const user = {
}; */
const usersLogados = [];

/* const filterUserLogados = (nameAleatorio) => {
  usersLogados.unshift(nameAleatorio);
}; */

const salveMessage = async (message, nickname, io, idAleatorio) => {
  /* https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
  https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript */
  let name;
  if (!nickname) {
    name = idAleatorio;
  } else {
    name = nickname;
  }
  const d = new Date();
  const data = d.toISOString().substr(0, 10).split('-').reverse()
  .join('-');
  const horas = d.toLocaleTimeString();
  const timestamp = `${data} ${horas}`;
  await create({ message, name, timestamp });
  io.emit('message', `${timestamp} - ${name} : ${message}`);
};

const getAllMessages = async () => {
  const result = await getAll();
  return result;
};

const disconnect = (id) => {
  console.log('filter id :', usersLogados);
  console.log('disconnect id :', id);
  const result = usersLogados.map((curr, index) => {
    if (curr === id) {
      usersLogados.splice(index, 1);
    }
    return curr;
  });
  console.log('\n');
  return result;
};

const atualizarNome = (nickname, idAleatorio) => {
  usersLogados.map((curr, index) => {
    if (curr === idAleatorio) {
      usersLogados.splice(index, 1);
      usersLogados.push(nickname);
    }
    return curr;
  });
  return nickname;
};

module.exports = (io) => 
io.on('connection', async (socket) => {
    let idAleatorio = socket.id.slice(0, 16);
    usersLogados.unshift(idAleatorio);
    io.emit('nomeAleatorio', usersLogados);
    
    socket.on('salveUser', (nickname) => {
      idAleatorio = atualizarNome(nickname, idAleatorio);
      io.emit('nomeAleatorio', usersLogados);
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
      salveMessage(chatMessage, nickname, io, idAleatorio);
    });
    const getAlls = await getAllMessages();

    io.emit('html', getAlls);
    
    socket.on('disconnect', () => {
      disconnect(idAleatorio);
      io.emit('nomeAleatorio', usersLogados);
    });
});