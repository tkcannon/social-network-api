module.exports = (date) => {
  var dayjs = require('dayjs');
  const dayObj = dayjs(date);

  const formatedDate = `${dayObj.format('MMM D, YYYY')} at ${dayObj.format('H:MM a')}`

  return (formatedDate);
}