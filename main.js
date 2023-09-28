const { app, Tray, Menu } = require("electron");
const Store = require("electron-store");
const { RequestListner } = require("./main_process/requestListner.js");
const { createMainWindow } = require("./main_process/manageWindows.js");
const { WindowDisplay } = require("./main_process/windowDisplay.js");
const { InitilizeTray } = require("./main_process/initilizeTray.js");

const store = new Store();
store.clear();

let mainWindow, tray;

app.whenReady().then(() => {
  mainWindow = createMainWindow();
  WindowDisplay();
  RequestListner();
  InitilizeTray();
});
