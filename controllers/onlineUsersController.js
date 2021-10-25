const onlineUsersModel = require('../models/onlineUsersModel');

const addOnlineUser = (payload) => onlineUsersModel.addOnlineUser(payload);

const removeOnlineUser = (nicknameId) => onlineUsersModel.removeOnlineUser(nicknameId);

const changeUserNickname = (payload) => onlineUsersModel.changeUserNickname(payload);

module.exports = {
    addOnlineUser,
    removeOnlineUser,
    changeUserNickname,
};