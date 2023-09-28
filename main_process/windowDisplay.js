const { getMainWindow } = require("./manageWindows");
const { NeedToSolve } = require("./needToSolve");

async function sleep(minutes) {
  const milliseconds = minutes * 60000; // Convert minutes to milliseconds
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function WindowDisplay() {
  while (!NeedToSolve()) {
    console.log("Can not display windows");
    await sleep(1);
  }
  const mainWindow = getMainWindow();
  mainWindow.loadURL("https://leetcode.com/problems/two-sum/description/");
  mainWindow.on("close", (event) => {
    event.preventDefault();
    console.log("Window is being closed");
    mainWindow.hide();
  });
}

module.exports = {
  WindowDisplay,
};
