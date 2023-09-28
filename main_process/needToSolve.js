const Store = require("electron-store");

const store = new Store();

const NeedToSolve = () => {
  const currentDate = new Date();
  const previousDate = store.get("lastSolvedDate");
  console.log('Privious Date', previousDate)
  if (previousDate == undefined) return true;
  if (
    currentDate.getFullYear > previousDate.year ||
    currentDate.getMonth > previousDate.month ||
    currentDate.getDate > previousDate.date
  ) {
    
    const setTime = store.get("setTime");
    if (setTime == undefined) return true;
    if (
      currentDate.getHours > setTime.hours ||
      currentDate.getMinutes > setTime.minutes ||
      currentDate.getSeconds > setTime.seconds
    ) {
      return true;
    }
  }

  return false;
};

module.exports = {
  NeedToSolve,
};
