const { Menu } = require("electron");
const { getSetTimeWindow } = require("../browser_windows/manageWindows");

const createMenu = () => {
  const template = [
    {
      label: "Settings",
      click: () => {
        console.log("Settings clicked");
      },
      submenu: [
        {
          label: "Pause",
          click: () => {
            console.log("Pause Clicked");
          },
          type: "checkbox",
          checked: "false",
        },
        {
          label: "Change time",
          click: () => {
            const setTimeWindow = getSetTimeWindow();
            setTimeWindow.show();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  console.log("Setting Menu");
  Menu.setApplicationMenu(menu);
};

module.exports = {
  createMenu,
};
