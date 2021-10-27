const guest = [];

const addGuest = (nickname, id) => {
    guest.push({
        nome: nickname,
        id,
    });
};
module.exports = { addGuest };