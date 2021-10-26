const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/html/index.html`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Escutando na porta: ${PORT}`);
});