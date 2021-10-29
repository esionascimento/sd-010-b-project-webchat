require('dotenv').config();
let http = require('http');
const app = require('./src/app/app');

http = http.createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
