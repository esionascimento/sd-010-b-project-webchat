// acesse em: https://newbedev.com/javascript-javascript-get-current-date-format-dd-mm-yyyy-hh-mm-ss-code-example
function dateNow() {
  const dateObg = new Date();

  // adjust 0 before single digit date
  const date = (`0${dateObg.getDate()}`).slice(-2);

  // current month
  const month = (`0${dateObg.getMonth() + 1}`).slice(-2);

  // current year
  const year = dateObg.getFullYear();

  // current hours
  const hours = dateObg.getHours();

  // current minutes
  const minutes = dateObg.getMinutes();

  // current seconds
  const seconds = dateObg.getSeconds();

  // prints date & time in YYYY-MM-DD HH:MM:SS format
  return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
} 
 
 module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(`Mensagem ${message.nickname}`);
    io.emit('message', `${dateNow()} - ${message.nickname}: ${message.chatMessage}`);
  });
});