// Faça seu código aqui
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const http = require('http').createServer(app);

const port = 3000;

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    },
});

const guestControler = require('./helpers/helpers');
const chatController = require('./controller/chatController');
const midlewares = require('./midlewares/midlewares');

io.on('connection', (socket) => {
    console.log('Connect', socket.id);
    socket.on('disconnect', () => {
        guestControler.excludeGuest(socket);
        io.emit('guests', guestControler.getGuests());
    });
    socket.on('adduser', (random) => {
        guestControler.addGuest(random, socket);
      io.emit('guests', guestControler.getGuests());
    });
    socket.on('nickname', (nickname) => {
        guestControler.editGuest(nickname, socket);
        io.emit('guests', guestControler.getGuests());
    });

    socket.on('message', (message) => {
        const { chatMessage, nickname } = message;
        const dados = midlewares.getDate(chatMessage, nickname);
        io.emit('message', dados);
    });
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.get);

http.listen(port, () => {
    console.log('message', port);
});