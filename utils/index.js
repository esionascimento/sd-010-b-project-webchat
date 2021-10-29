// Função de data e hora foi sugerido pelo colega Renato Graça

const getFullDateNow = () => {
  const dateNow = new Date();
  return `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;
};

const getFullTimeNow = () => {
  const dateNow = new Date();
  let minutes = dateNow.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${dateNow.getHours()}:${minutes}-${dateNow.getSeconds()}`;
};

module.exports = {
  getFullDateNow,
  getFullTimeNow,
};