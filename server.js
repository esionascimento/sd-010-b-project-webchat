const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

app.use(cors());
const io = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:${PORT}`,
        methods: ['GET', 'POST'],
    },
});

const webchatController = require('./controllers/webchatController.js');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

require('./socket/webchat')(io);

app.get('/', webchatController.root);

http.listen(PORT, () => {
    console.log(`Ouvindo na porta ${PORT}`);
});
