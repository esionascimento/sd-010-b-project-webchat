let onlineUsers = [];

const addOnlineUser = (payload) => {
    onlineUsers.push(payload);
    return onlineUsers;
};

const removeOnlineUser = (nicknameId) => {
    onlineUsers = onlineUsers.filter((user) => user.nicknameId !== nicknameId).slice();
    return onlineUsers;
};

const changeUserNickname = (payload) => {
    onlineUsers = onlineUsers.map((user) => {
        if (user.nicknameId === payload.nicknameId) {
            return { nicknameId: payload.nicknameId, databaseNickname: payload.databaseNickname };
        }
        return user;
    }).slice();
    return onlineUsers;
};

module.exports = {
    onlineUsers,
    addOnlineUser,
    removeOnlineUser,
    changeUserNickname,
};
