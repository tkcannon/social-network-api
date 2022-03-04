var dayjs = require('dayjs');

module.exports = (date) => {
  const dayObj = dayjs(date);

  const formatedDate = `${dayObj.format('MMM D, YYYY')} at ${dayObj.format('H:MM a')}`

  return (formatedDate);
}