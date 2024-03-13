const puppeteer = require("puppeteer");
const { storeData } = require("../db/store_data");

const scrapeNc150 = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://neetcode.io/practice");

    // To get types of question list
    const elements = await page.$$("ul .tab-link");
    for (const element of elements) {
      const value = await page.evaluate((el) => el.innerHTML, element);
      // Only select Neetcode all
      if (value.includes("NeetCode 150")) {
        await element.click();
        console.log("Element clicked");
      }
      console.log(value);
    }
    const gridViewButton = await page.$(
      ".button.navbar-btn.is-rounded.is-info.is-outlined.has-tooltip-bottom",
    );
    const buttonText = await gridViewButton.evaluate(
      (el) => el.getAttribute("data-tooltip"),
      gridViewButton,
    );
    console.log("Button text:", buttonText);
    await gridViewButton.click();
    const tableElements = await page.$$(".my-table-container");
    console.log(tableElements.length);
    const problemList = [];
    for (const tableElement of tableElements) {
      const pTag = await tableElement.$("p");
      const problemType = await pTag.evaluate((el) => el.textContent, pTag);
      // console.log("Problem type:", problemType);
      const tableRows = await tableElement.$$("tbody > tr");
      for (const tableRow of tableRows) {
        const aTag = await tableRow.$("a");
        const problemName = await aTag.evaluate((el) => el.textContent, aTag);
        const href = await aTag.evaluate((el) => el.getAttribute("href"), aTag);
        const bTag = await tableRow.$("b");
        const difficulty = await bTag.evaluate((el) => el.textContent, bTag);
        problemList.push({
          problemName: problemName,
          problemType: problemType,
          difficulty: difficulty,
          href: href,
        });
      }
    }
    console.log(problemList.length);
    await storeData(problemList, "neetcode_150");
    console.log("Wait over");
  } catch (e) {
    console.log("An error occured:", e);
  } finally {
    // Close the browser.
    await browser.close();
  }
};

scrapeNc150();
