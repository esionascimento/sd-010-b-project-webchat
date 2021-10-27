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

io.on('connection', (socket) => {
    console.log('Connect', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Disconnect', socket.id);
    });
    socket.on('message', (message) => {
        guestControler.addGuest(message.nickname, socket.id);
        console.log(message);
        const { chatMessage, nickname } = message;
        const date = new Date();
        // https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/
        const dataAtual = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const horaAtual = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        
        const dados = `${dataAtual} ${horaAtual} - ${nickname}: ${chatMessage}`;
        io.emit('message', dados);
    });
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', chatController.get);
http.listen(port, () => {
    console.log('message', port);
});