const Store = require("electron-store");

const store = new Store();

const SetSolved = () => {
    const currentDate = new Date();
    store.set('lastSolvedDate', {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        date: currentDate.getDate()
    })

}

module.exports = {
    SetSolved
}