// Will monitor web requests to see if the user has made successfull attempt or not
// after getting the check request, it will get the headers and make a get fetch request
// to see if the submitted ans is right or not.

const { session } = require("electron");
const { SetSolved } = require("./setSolved");
const { WindowDisplay } = require("./windowDisplay");
const { getMainWindow } = require("./manageWindows");

const filter = {
  urls: ["https://leetcode.com/*", "*://electron.github.io/*"],
};

let tempDataCopy = '';

const RequestListner = () => {

  const mainWindow = getMainWindow();

  session.defaultSession.webRequest.onSendHeaders(filter, (details) => {

    if (details.url.includes("check")) {
      fetch(details.url, {
        method: "GET",
        headers: details.requestHeaders,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Need this because sometime there are two response with the same response data
          // and it calls SetSolved() and WindowDisplay() twice because the request is being made twice
          if (
            data.status_msg == "Accepted" &&
            tempDataCopy != data.status_msg
          ) {
            mainWindow.hide();
            SetSolved();
            WindowDisplay();
          }
          tempDataCopy = data?.status_msg ? data.status_msg : '';

        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });
    }
    
  });

};

module.exports = {
  RequestListner,
};
