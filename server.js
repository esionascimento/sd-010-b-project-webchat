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
  
app.use(cors());
app.use(express.json());

const allMessage = [];

io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    socket.on('message', (data) => {
      allMessage.push(data);
      io.emit('message', data);
    });

    socket.emit('mensagem', 
      console.log(allMessage, `dados enviados do servidor ${socket.id}`));
});

app.get('/', async (req, res) => {
  res.status(200).render('client');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});

/* app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/client.ejs`);
}); 
 */