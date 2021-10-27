const express = require('express');

const app = express();
const server = require('http').createServer(app);

const port = 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST', 'PUT', 'DELET'],
  },
});

const dataCerta = () => {
  const date = new Date();
  const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return data;
};

const horaCerta = () => {
  const date = new Date();
  let minutos = date.getMinutes();

  if (minutos < 10) {
    minutos = `0${minutos}`;
  }

  const hourAndMinute = `${date.getHours()}:${minutos}:${date.getSeconds()}`; 
  return hourAndMinute;
};
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

io.on('connection', (client) => {
  console.log(`client on ID: ${client.id}`);
  client.on('message', ({ chatMessage, nickname = client.id }) => {
    const message = `${dataCerta()} ${horaCerta()} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});

app.get('/', (req, res) => res.render('index'));
server.listen(port);