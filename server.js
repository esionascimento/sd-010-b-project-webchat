// Faça seu código aqui
const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });
  
const { renderChat } = require('./controllers/clientController');

app.use(cors());
app.use(express.json());

const allMessage = [];

const dataAtual = new Date();
const dia = (dataAtual.getDate() < 10 ? '0' : '') + dataAtual.getDate();
const mes = ((dataAtual.getMonth() + 1) < 10 ? '0' : '') + (dataAtual.getMonth() + 1);

// Peguei no site https://www.devmedia.com.br/como-criar-um-chat-com-node-js/33719
function dataHora() {
  const ano = dataAtual.getFullYear();
  const hora = (dataAtual.getHours() < 10 ? '0' : '') + dataAtual.getHours();
  const minuto = (dataAtual.getMinutes() < 10 ? '0' : '') + dataAtual.getMinutes();
  const segundo = (dataAtual.getSeconds() < 10 ? '0' : '') + dataAtual.getSeconds();
  const dataFormatada = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;
  return dataFormatada;
}

const newDataHora = dataHora();

io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    socket.on('message', (data) => {
      allMessage.push(data);
      io.emit('message', `${newDataHora} - ${data.nickname}: ${data.chatMessage}`);
    });

    socket.emit('mensagem', 
      console.log(allMessage, `dados enviados do servidor ${socket.id}`));
});

app.get('/', renderChat);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
