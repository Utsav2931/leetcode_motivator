const { session } = require("electron");
const { SetSolved } = require("./setSolved");
const { WindowDisplay } = require("./windowDisplay");
const { getMainWindow } = require("./manageWindows");

const filter = {
  urls: ["https://leetcode.com/*", "*://electron.github.io/*"],
};

const RequestListner = () => {
  const mainWindow = getMainWindow();
  session.defaultSession.webRequest.onSendHeaders(filter, (details) => {
    if (details.url.includes("check")) {
      // console.log(details)
      console.log("This is url: ", details.url);
      fetch(details.url, {
        method: "GET",
        headers: details.requestHeaders,
      })
        .then((response) => {
          // console.log(response.body)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          //   mainWindow.setClosable(true);
          if (data.status_msg == "Accepted") {
            mainWindow.hide();
            SetSolved();
            WindowDisplay();
          }
          console.log("This is the response: ", data);
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
    // console.log(details.requestHeaders)
  });
};

module.exports = {
  RequestListner,
};
