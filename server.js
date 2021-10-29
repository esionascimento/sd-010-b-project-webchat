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

const webController = require('./controllers/webControler');
const { dataCerta, horaCerta } = require('./utils/util');

app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

io.on('connection', async (client) => {
  console.log(`client on ID: ${client.id}`);
  client.on('message', ({ chatMessage, nickname }) => {
    webController.saveMessages({ message: chatMessage, nickname });
    const message = `${dataCerta()} ${horaCerta()} - ${nickname}: ${chatMessage}`;
    io.emit('message', message);
  });
});

const getAll = async () => {
  const message = await webController.getAll();
  return message;
};

app.get('/', async (req, res) => res.render('index', { messages: await getAll() }));
server.listen(port);