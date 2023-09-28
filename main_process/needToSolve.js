// Check if the last solved data is equal to current date or not
// After that will check if the user has set any time to show the problem or not

const Store = require("electron-store");

const store = new Store();

const NeedToSolve = () => {
  const currentDate = new Date();
  const previousDate = store.get("lastSolvedDate");
  if (previousDate == undefined) return true;
  if (
    currentDate.getFullYear() > previousDate.year ||
    currentDate.getMonth() + 1 > previousDate.month ||
    currentDate.getDate() > previousDate.date
  ) {

    const setTime = store.get("setTime");
    if (setTime == undefined) return true;
    if (
      currentDate.getHours() > setTime.hours ||
      currentDate.getMinutes() > setTime.minutes ||
      currentDate.getSeconds() > setTime.seconds
    ) {
      return true;
    }
  }

  return false;
};

module.exports = {
  NeedToSolve,
};
