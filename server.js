const express = require('express');
const http = require('http');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.get('/', (_req, res) => {
  res.send('<h1>Welcome!</h1>');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
