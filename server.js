require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

const ChatModel = require('./models/chat');

app.use(express.static(`/${__dirname}/public/`)); 
// da acesso aos arquivos de /public

require('./sockets/chat')(io);
// traz as configs dos sockets

app.get('/messages', async (req, res) => {
  const messages = await ChatModel.getAllMessages();
  if (!messages) return res.status(200).json({ message: 'sem menssagens' });
  return res.status(200).json(messages);
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/webchat.html`);
});

http.listen(PORT, () => { console.log(`Servidor on na porta ${PORT}`); });
