module.exports = (io) => io.on('connection', (socket) => {
console.log(socket);

  // socket.on('likePost', () => {
  //   currentLikes += 1;

  //   socket.emit('updateLikes', currentLikes);
  // });

  // socket.on('starPost', () => {
  //   currentStars += 1;

  //   socket.broadcast.emit('updateStars', currentStars);
  // });
});