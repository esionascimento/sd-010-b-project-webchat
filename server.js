const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const moment = require('moment');

// Cors basicamente é nosso servidor!!!
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

// Iniciando conexão!!
app.use(cors());

// Quando o socket é on ele está aguardando mensagem!
// quando é emit ele está emitindo mensagem mas para quem? neste caso aqui do back para o front!
io.on('connection', (socket) => {
    // enviando pro front que usuario se conectou
    console.log('Alguém se conection');
    // Enviando a mensagem da desconexão lembre-se que nome da funçao é disconnect
    // Quando vamos no fron end essa string ' disconnect significa que lá quem envia um disconnect 
    socket.on('disconnect', () => {
        console.log('Alguém se desconectou');
    });
    socket.on('message', (msg) => {
      // acertando o momento e verifico falta ir formando conforme o
      io.emit('newConnection', { message: `${moment().format('DD-MM-yyyy, h:mm:ss a')} ${msg}` });
    });

    // Estava conflitando!!!
    // socket.emit('message', ' Seja bem vindo ao chat!! Este back emitindo pro front!');

    socket.broadcast.emit('newConnection', { message: 'Eba urro front alguém se conectou' });
});
// Rota get que faz a importação do html
// lembrando que por aqui voce pode receber um login por exemplo através de req.body!! e valida-lo!
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});