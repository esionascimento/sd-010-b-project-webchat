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

io.on('connection', (socket) => {
  console.log(`${socket.id} conectado`);
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
 });

http.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`);
});
