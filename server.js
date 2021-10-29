require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (_req, _res) => console.log('ok'));

http.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
