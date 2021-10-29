const dataCerta = () => {
  const date = new Date();
  const data = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return data;
};

const horaCerta = () => {
  const date = new Date();
  let minutos = date.getMinutes();

  if (minutos < 10) {
    minutos = `0${minutos}`;
  }

  const hourAndMinute = `${date.getHours()}:${minutos}:${date.getSeconds()}`; 
  return hourAndMinute;
};

module.exports = {
  dataCerta,
  horaCerta,
};