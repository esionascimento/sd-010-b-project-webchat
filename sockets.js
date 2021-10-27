const { create, getAll } = require('./controllers/chatController');

const user = {
};
const usersLogados = [];

const filterUserLogados = (nameAleatorio) => {
  usersLogados.push(nameAleatorio);
  console.log('nameAleatorio :', usersLogados);
  
  /* const result = usersLogados.map((curr) => {
    console.log('usersLogados', usersLogados);
    if (curr !== nameAleatorio) {
      console.log('curr1 :', curr);
      return nameAleatorio;
    }
    console.log('nameAleatorio2 :', nameAleatorio);
    return null;
  });
  return result; */
};

const salveMessage = async (message, nickname, io) => {
  /* https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
  https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript */
  const d = new Date();
  const data = d.toISOString().substr(0, 10).split('-').reverse()
  .join('-');
  const horas = d.toLocaleTimeString();
  const timestamp = `${data} ${horas}`;
  await create({ message, nickname, timestamp });
  io.emit('message', `${timestamp} - ${nickname} : ${message}`);
};

const getAllMessages = async () => {
  const result = await getAll();
  return result;
};

const disconnect = (id) => {
  const result = usersLogados.map((curr, index) => {
    if (curr === id) {
      usersLogados.splice(index, 1);
    }
    return curr;
  });
  return result;
};

const atualizarNome = (nickname, idAleatorio) => {
  const result = usersLogados.map((curr, index) => {
    if (curr === idAleatorio) {
      usersLogados.splice(index, 1);
      usersLogados.push(nickname);
    }
    return curr;
  });
  usersLogados.sort();
  return result;
};

module.exports = (io) => 
  io.on('connection', async (socket) => {
    let idAleatorio = socket.id.slice(0, 16);
    filterUserLogados(idAleatorio);
    io.emit('nomeAleatorio', usersLogados);
    
    socket.on('salveUser', (nickname) => {
      atualizarNome(nickname, idAleatorio);
      idAleatorio = nickname;
      io.emit('nomeAleatorio', usersLogados);
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
      salveMessage(chatMessage, nickname, io);
    });
    const getAlls = await getAllMessages();

    io.emit('html', getAlls);
    
    socket.on('disconnect', () => {
      disconnect(idAleatorio);
      io.emit('nomeAleatorio', usersLogados);
    });
});