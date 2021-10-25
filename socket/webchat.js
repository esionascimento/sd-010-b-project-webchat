const webchatController = require('../controllers/webchatController');
const onlineUsersController = require('../controllers/onlineUsersController');

const socketMessage = (io, socket) => {
    socket.on('message', async (payload) => {
        const { chatMessage, nickname } = payload;

        const date = new Date();
        const brazilianDate = date.toLocaleDateString();
        const timeHMS = ` ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const formattedDate = `${brazilianDate} ${timeHMS}`;

        await webchatController.saveMessage({ chatMessage, nickname, formattedDate });

        const formattedMessage = `${formattedDate} - ${nickname}: ${chatMessage}`;
        
        io.emit('message', formattedMessage);
    });
};

const nicknameStart = (io, socket) => {
   const nicknameId = socket.id.slice(0, 16);
   const databaseNickname = nicknameId;
   socket.emit('nicknameId', nicknameId);
    console.log(`${nicknameId} conectado!`);
    // socket.emit('currentNickname', currentNickname);
    
    const updatedOnlineUsers = onlineUsersController
    .addOnlineUser({ nicknameId, databaseNickname });
    socket.emit('databaseNickname', databaseNickname);
    io.emit('onlineUsers', updatedOnlineUsers);
    return nicknameId;
};

const nicknameChange = (io, socket, nicknameId) => {
    socket.on('newNickname', (nickname) => {
        const updatedOnlineUsers = onlineUsersController
        .changeUserNickname({ nicknameId, databaseNickname: nickname });
        // socket.emit('changeNickname', nickname);
        io.emit('onlineUsers', updatedOnlineUsers);
    });
};

const connection = (io) => {
    io.on('connection', (socket) => {
       const nicknameId = nicknameStart(io, socket);
       
       nicknameChange(io, socket, nicknameId);
        
       socketMessage(io, socket);

        socket.on('disconnect', () => {
           const updatedOnlineUsers = onlineUsersController.removeOnlineUser(nicknameId);
            io.emit('onlineUsers', updatedOnlineUsers);
        });
    });
};

module.exports = connection;