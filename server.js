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

/* const allMessage = []; */

io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
   /*  socket.on('message', ({ chatMessage, nickname }) => {
        allMessage.push({ chatMessage, nickname });
    }); */
});

/* app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});  */

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});