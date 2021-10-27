// gera a data no momento atual
const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

// const crypto = require('crypto');

// criação do nickname aleatório
// const randomNickName = () => crypto.randomBytes(8).toString('hex');

module.exports = { getDate };
