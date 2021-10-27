const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('views', './views');

app.set('view engine', 'ejs');

const { getAll, createMessage, updateMessage } = require('./controller/messages');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

// const http = require('http').createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.put('/update', updateMessage);
app.post('/create', createMessage);
app.get('/', getAll);

// const io = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:3000', 
//     methods: ['GET', 'POST', 'PUT'], 
//   },
// });

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));