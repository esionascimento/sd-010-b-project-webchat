let onlineUsers = [];

const addUser = (data) => {
    onlineUsers.push(data);
    return onlineUsers;
};

const removeUser = (nicknameId) => {
    onlineUsers = onlineUsers.filter((user) => user.nicknameId !== nicknameId).slice();
    return onlineUsers;
};

const changeNickname = (data) => {
    onlineUsers = onlineUsers.map((user) => {
        if (user.nicknameId === data.nicknameId) {
            return { nicknameId: data.nicknameId, databaseNickname: data.databaseNickname };
        }
        return user;
    }).slice();
    return onlineUsers;
};

module.exports = {
    onlineUsers,
    addUser,
    removeUser,
    changeNickname,
};
