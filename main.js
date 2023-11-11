const { app, Tray, Menu } = require("electron");
const Store = require("electron-store");
const { requestListner } = require("./main_process/requestListner.js");
const { createMainWindow } = require("./main_process/manageWindows.js");
const { windowDisplay } = require("./main_process/windowDisplay.js");
const { initilizeTray } = require("./main_process/initilizeTray.js");

const store = new Store();
store.clear();

let mainWindow, tray;

app.whenReady().then(() => {
  mainWindow = createMainWindow();
  windowDisplay();
  requestListner();
  initilizeTray();
});
