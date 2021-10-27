let users = [];

const addUser = (data) => {
    users.push(data);
    return users;
};

const removeUser = (nicknameId) => {
    users = users.filter((user) => user.nicknameId !== nicknameId).slice();
    return users;
};

const changeNickname = (data) => {
    users = users.map((user) => {
        if (user.nicknameId === data.nicknameId) {
            return { nicknameId: data.nicknameId, databaseNickname: data.databaseNickname };
        }
        return user;
    }).slice();
    return users;
};

module.exports = {
    users,
    addUser,
    removeUser,
    changeNickname,
};
