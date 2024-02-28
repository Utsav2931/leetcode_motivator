const { Tray, Menu } = require("electron");
const { NeedToSolve } = require("./needToSolve");
const { getMainWindow } = require("./manageWindows");

let tray;

const initilizeTray = () => {
  const mainWindow = getMainWindow();
  tray = new Tray("assets/imgs/logo.png");
  // Layout of tray menu when user clicks on it and what you you want to do for each lable.
  const template = [
    {
      label: "Show App",
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        !NeedToSolve() && mainWindow.destroy();
      },
    },
  ];
  const contextMenu = Menu.buildFromTemplate(template);

  // Create the tray icon.
  tray.setContextMenu(contextMenu);
};

module.exports = {
  initilizeTray,
};
