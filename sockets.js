const { create, getAll } = require('./controllers/chatController');

const user = {
};
const usersLogados = [];

const filterUserLogados = (nameAleatorio) => {
  console.log('usersLogados :', usersLogados);
  console.log('nameAleatorio :', nameAleatorio);
  const result = usersLogados.map((curr) => {
    console.log('curr :', curr);
    if (curr === nameAleatorio) {
      return nameAleatorio;
    }
    return null;
  });
  return result;
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

module.exports = (io) => 
io.on('connection', async (socket) => {
  const nameAleatorio = socket.id.slice(0, 16);
  usersLogados.push(nameAleatorio);
  filterUserLogados(nameAleatorio);
  
  io.emit('nomeAleatorio', usersLogados);
  
  socket.on('salveUserr', (nickname) => {
    user.nickname = nickname;
  });
  
  socket.on('message', ({ chatMessage, nickname }) => {
    salveMessage(chatMessage, nickname, io);
  });
  const aux = await getAllMessages();
  console.log('aux :', aux);

  io.emit('html', aux);
  
  socket.on('disconnect', () => {
    console.log('disconnect', socket.id);
  });
});
