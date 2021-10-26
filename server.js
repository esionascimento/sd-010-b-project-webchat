const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

app.get('/', (req, res) => {
  res.json({
    message: 'oi',
  });
});

httpServer.listen(3001, () => console.log('listening on port 3000'));