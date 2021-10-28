// source: https://usefulangle.com/post/187/nodejs-get-date-time
const getDate = () => {
const dateObj = new Date();

const date = (`0${dateObj.getDate()}`).slice(-2);

const month = (`0${dateObj.getMonth() + 1}`).slice(-2);

const year = dateObj.getFullYear();

const hours = dateObj.getHours();

const minutes = dateObj.getMinutes();

return (`${date}-${month}-${year} ${hours}:${minutes}`);
};

module.exports = {
  getDate,
};