// Will monitor web requests to see if the user has made successfull attempt or not
// after getting the check request, it will get the headers and make a get fetch request
// to see if the submitted ans is right or not.

const { session } = require("electron");
const { setSolved } = require("./setSolved");
const { windowDisplay } = require("./windowDisplay");
const { getMainWindow } = require("./manageWindows");

const filter = {
  urls: ["https://leetcode.com/*", "*://electron.github.io/*"],
};

let tempDataCopy = '';

const requestListner = () => {

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
          // console.log('Data: ',data)
          // Need this because sometime there are two response with the same response data
          // and it calls setSolved() and windowDisplay() twice because the request is being made twice
          if (
            data.status_msg == "Accepted" &&
            tempDataCopy != data.status_msg && 
            data.runtime_percentile // Becauss code run also has the same status_msg We only want to continue this if the user makes a submission.
          ) {
            mainWindow.hide();
            setSolved();
            windowDisplay();
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
  requestListner,
};
