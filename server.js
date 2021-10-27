require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
 });

 // função executada quando um cliente se conecta
io.on('connection', (socket) => {
  console.log(`${socket.id} conectado`);
  socket.on('message', (message) => {
    console.log(message, 'consoleMessage');
    io.emit('message', message);
  });
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
 });

http.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});
