module.exports = (io) => io.on('connection', (socket) => {
  console.log(`${socket.id} se conectou`);

  socket.on('message', ({ chatMessage, nickname }) => {
    /* SOURCE https://stackoverflow.com/questions/42862729/convert-date-object-in-dd-mm-yyyy-hhmmss-format
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString */
    const date = new Date();
    const msg = `${date.toLocaleString('en-US')} - ${nickname}: ${chatMessage}`.replace(/\//g, '-');
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('alguém saiu');
  });
});