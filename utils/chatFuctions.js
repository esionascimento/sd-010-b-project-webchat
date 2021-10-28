const transformDate = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};
const verifyDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = transformDate(date.getMinutes());
  const secconds = transformDate(date.getSeconds());
  let amOrPm = 'AM';
  if (hours > 12) {
    hours -= 12;
    hours = `0${hours}`;
    amOrPm = 'PM';
  }
  console.log(day, month, year, hours, minutes, secconds, amOrPm);

  return { day, month, year, hours, minutes, secconds, amOrPm };
};
const getDate = () => {
  const { day, month, year, hours, minutes, secconds, amOrPm } = verifyDate();
  const currentDate = `${day}-${month + 1}-${year}`;
  const currentTime = `${hours}:${minutes}:${secconds} ${amOrPm}`;

  return `${currentDate} ${currentTime}`;
};

module.exports = { getDate };