// Faça seu código aqui
const express = require('express');
const http = require('http');

const app = express();

const cors = require('cors');

const httpServer = http.createServer(app);

const port = 3000;

app.use(cors());

const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});

const webChat = require('./sockets');

webChat(io);

// precisa do http server para fazer a conexão com o socket io, 
// o express vai rodar o io, e para o io rodar ele precisa de um listner.
// o socketIo não roda independente igual o app faz.

// colocando o app para rodar no servidor criado, httpServer

app.get('/', (req, res) => res.send('Hello World!'));

httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));