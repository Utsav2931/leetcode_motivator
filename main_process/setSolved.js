// Sets the date of the successful attempt

const Store = require("electron-store");

const store = new Store();

const setSolved = () => {
    const currentDate = new Date();
    store.set('lastSolvedDate', {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        date: currentDate.getDate()
    })
    // console.log('Set Date,', currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
}

module.exports = {
    setSolved
}