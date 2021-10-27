const xablau = [];

const addGuest = (nickname, socket) => {
    xablau.push({
      nome: nickname,
      id: socket.id,
    });
  return xablau;
};
// ajuda do zozimo
const editGuest = (nickname, socket) => {
  const indexAchado = xablau.findIndex((item) => item.id === socket.id);
  xablau[indexAchado].nome = nickname;
};
const getGuests = () => xablau;

const excludeGuest = (socket) => {
  const indexAchado = xablau.findIndex((item) => item.id === socket.id);
  xablau.splice(indexAchado, 1);
 // console.log(xablau);
};

module.exports = { addGuest, getGuests, editGuest, excludeGuest };