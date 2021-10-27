const getDate = () => {
  const date = new Date();
  const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} AM`;
  if (date.getHours() > 12) {
    currentTime = `${date.getHours() - 12}:${date.getMinutes()}:${date.getSeconds()} PM`;
  }
  if (date.getMinutes() < 10) {
    currentTime = `${date.getHours() - 12}:0${date.getMinutes()}:${date.getSeconds()} PM`;
  }
  if (date.getSeconds() < 10) {
    currentTime = `${date.getHours() - 12}:${date.getMinutes()}:0${date.getSeconds()} PM`;
  }
  return `${currentDate} ${currentTime}`;
};
module.exports = { getDate };