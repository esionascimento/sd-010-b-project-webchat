// Faça seu código aqui
require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path');

app.use(bodyParser.json());

const http = require('http').createServer(app);

const { PORT } = process.env;

let message = '';

// Função de hora atual
const horaCerta = () => {
    const date = new Date();
    const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const hourAndMinute = `${date.getHours()}:${date.getMinutes()}`; 
    return `${data} ${hourAndMinute}`;
    }; 

const io = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
    cors({
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization'],
    }),
);

io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    
    socket.on('message', (data) => {
        if (!data.nickname) {
           return data.nickname === data.id;
        }
        message = ` ${horaCerta()} - ${data.nickname}: ${data.chatMessage}`;
        console.log(message);
        io.emit('message', message);
    });
});

app.use('/', (req, res) => {
        res.render('index', { message });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});