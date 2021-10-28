const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

require('./socket/chatSocket')(io);

app.get('/', (_req, res) => {
  res.render('index.html');
});

http.listen(port, () => console.log(`Example app listening on ${port}!`));