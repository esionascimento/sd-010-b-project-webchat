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
  const result = usersLogados.map((curr) => {
    if (curr === id) {
      usersLogados.pop(id);
    }
    return curr;
  });
  return result;
};

module.exports = (io) => 
  io.on('connection', async (socket) => {
    const idAleatorio = socket.id.slice(0, 16);
    filterUserLogados(idAleatorio);
    console.log(socket.id);
    io.emit('nomeAleatorio', usersLogados);
    
    socket.on('salveUserr', (nickname) => {
      user.nickname = nickname;
    });
    
    socket.on('message', ({ chatMessage, nickname }) => {
      salveMessage(chatMessage, nickname, io);
    });
    const getAlls = await getAllMessages();

    io.emit('html', getAlls);
    
    socket.on('disconnect', () => {
      console.log('disconnect :', socket.id);
      disconnect(idAleatorio);
      io.emit('nomeAleatorio', usersLogados);
    });
});