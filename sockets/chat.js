module.exports = (io) => io.on('connection', (socket) => {
    console.log(`${socket.id} se conectou`);

    socket.on('message', (message) => {
        console.log(message);
        socket.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('alguém saiu');
    });
});