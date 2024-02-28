// Will check if the user needs to solve a question today
// If not it will display the window with the quesion

const { getMainWindow } = require("./manageWindows");
const { NeedToSolve } = require("./needToSolve");

async function sleep(minutes) {
  const milliseconds = minutes * 60000; // Convert minutes to milliseconds
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function windowDisplay() {
  const mainWindow = getMainWindow();
  while (!NeedToSolve()) {
    console.log("Can not display windows\r");
    mainWindow.close(); // Delete this as well
    await sleep(1); // Change the value in the final version.
  }
  mainWindow.show();
  mainWindow.loadURL("https://leetcode.com/problems/two-sum/description/");
  // Uncomment at last
  // mainWindow.on("close", (event) => {
  //   event.preventDefault();
  //   console.log("Window is being closed");
  //   mainWindow.hide();
  // });
}

module.exports = {
  windowDisplay,
};
