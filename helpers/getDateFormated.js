// put zero if number smaller than 10
const formatNumber = (number) => (number < 10 ? `0${number}` : number);

const getDateFormated = () => {
  const currentDate = new Date();

  const DD = formatNumber(currentDate.getDate());
  const MM = formatNumber(currentDate.getMonth());
  const yyyy = formatNumber(currentDate.getFullYear());
  
  const HH = formatNumber(currentDate.getHours());
  const mm = formatNumber(currentDate.getMinutes());
  const ss = formatNumber(currentDate.getSeconds());

  const meridiem = (HH >= 0 && HH <= 12) ? 'AM' : 'PM';

  return `${DD}-${MM}-${yyyy} ${HH}:${mm}:${ss} ${meridiem}`;
};

module.exports = getDateFormated;