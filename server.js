require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
