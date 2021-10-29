const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const webchatController = require('./controllers/webchat.controller');

app.set('view engine', 'ejs');
app.set('views', './views');

require('./socket/chatSocket')(io);

app.get('/', webchatController.getAllMessages);

http.listen(port, () => console.log(`Example app listening on ${port}!`));