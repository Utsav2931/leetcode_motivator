// Manages creating of main window and returns reference to it so that all the
// file can use a single reference.
const { BrowserWindow } = require("electron");

let lcWindow, setTimeWindow;

function createLcWindow() {
  lcWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    show: false, // By default we don't want to show the window on creation.
  });

  return lcWindow;
}

function getLcWindow() {
  return lcWindow;
}

function createSetTimeWindow() {
  setTimeWindow = new BrowserWindow({
    width: 400,
    height: 300,
    show: false,
  });
}

function getSetTimeWindow() {
  return setTimeWindow;
}

module.exports = {
  createLcWindow,
  getLcWindow,
  createSetTimeWindow,
  getSetTimeWindow,
};
