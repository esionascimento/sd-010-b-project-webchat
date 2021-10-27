const guestControler = require('../helpers/helpers');
const model = require('../models/messageModel');
const midlewares = require('../midlewares/midlewares');

const disconect = (socket, io) => {
    socket.on('disconnect', () => {
        guestControler.excludeGuest(socket);
        io.emit('guests', guestControler.getGuests());
    });
};
const addUser = (socket, io) => {
    socket.on('adduser', (random) => {
        guestControler.addGuest(random, socket);
      io.emit('guests', guestControler.getGuests());
    });
};

const addNickname = (socket, io) => {
    socket.on('nickname', (nickname) => {
        guestControler.editGuest(nickname, socket);
        io.emit('guests', guestControler.getGuests());
    });
};

const newMessage = (socket, io) => {
    socket.on('message', async (message) => {
        const dados = midlewares.getDate(message.chatMessage, message.nickname);
        await model.create(message);
        io.emit('message', dados);
    });
};
const chat = (io) => {
io.on('connection', async (socket) => {
    console.log('Connect', socket.id);
    const history = await model.getAll();
    console.log(history);
    io.emit('history', history);
    disconect(socket, io);
    addUser(socket, io);
    addNickname(socket, io);
    newMessage(socket, io);
});
};

module.exports = chat;