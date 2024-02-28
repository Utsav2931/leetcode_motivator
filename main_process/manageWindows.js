// Manages creating of main window and returns reference to it so that all the 
// file can use a single reference.
const { BrowserWindow } = require("electron");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false, // By default we don't want to show the window on creation.
  });

  return mainWindow;
}

function getMainWindow() {
  return mainWindow;
}

module.exports = {
  createMainWindow,
  getMainWindow, 
};
