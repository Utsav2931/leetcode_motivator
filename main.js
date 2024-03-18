const { app, Tray, Menu } = require("electron");
const Store = require("electron-store");
const { requestListner } = require("./main_process/requestListner.js");
const { windowDisplay } = require("./main_process/windowDisplay.js");
const { initilizeTray } = require("./main_process/initilizeTray.js");
const { createMenu } = require("./main_process/menu.js");
const { createSetTimeWindow, createLcWindow } = require("./browser_windows/manageWindows.js");
const { manageSetTime } = require("./main_process/settingsWindow.js");

const store = new Store();
store.clear();


app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-gpu-compositing");

app.whenReady().then(() => {
  createLcWindow();
  windowDisplay();
  requestListner();
  initilizeTray();
  createMenu();
  createSetTimeWindow();
  manageSetTime();
});
