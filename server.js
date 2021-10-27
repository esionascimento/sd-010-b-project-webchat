require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${process.env.PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.static(`/${__dirname}/public`)); 
// da acesso aos arquivos de /public

require('./sockets/chat')(io);

app.get('/', async (req, res) => {
  // io.emit('salve', 'testando 123');
  res.sendFile(`${__dirname}/public/webchat.html`);
});

http.listen(process.env.PORT, () => { console.log('Servidor ouvindo na porta 3000'); });
