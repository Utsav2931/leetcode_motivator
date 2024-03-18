const { getSetTimeWindow } = require("../browser_windows/manageWindows");

const manageSetTime = () => {
  const setTimeWindow = getSetTimeWindow();
  setTimeWindow.loadFile("front_end/html/settime.html")
};

module.exports = {
  manageSetTime,
}