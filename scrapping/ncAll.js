const puppeteer = require("puppeteer");
const { storeData } = require("../db/store_data");

const scrapNeetCode = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://neetcode.io/practice");

    // To get types of question list
    const elements = await page.$$("ul .tab-link");
    for (const element of elements) {
      const value = await page.evaluate((el) => el.innerHTML, element);
      // Only select Neetcode all
      if (value.includes("NeetCode All")) {
        await element.click();
        console.log("Element clicked");
      }
      console.log(value);
    }
    // await element.dispose();

    // Get the table rows
    const tableElements = await page.$$("tbody tr");
    const problemList = [];

    for (const tableElement of tableElements) {
      // This will contain question name and href to the leetcode.
      const anchorElement = await tableElement.$("a");

      const problemName = await page.evaluate(
        (el) => el.textContent,
        anchorElement,
      );
      if (problemName === "") continue;

      const href = await page.evaluate(
        (el) => el.getAttribute("href"),
        anchorElement,
      );

      if (!href.includes("leetcode.com/problems")) continue;

      // This will contain difficulty of the question.
      const bElement = await tableElement.$("b");
      const difficulty = await page.evaluate((el) => el.innerHTML, bElement);

      problemList.push({
        problemName: problemName,
        difficulty: difficulty,
        href: href,
      });
    }

    console.log(problemList.length);
    await storeData(problemList, "neetcode_all");
    console.log("Wait over");
  } catch (e) {
    console.log("An error occured:", e);
  } finally {
    // Close the browser.
    await browser.close();
  }
};

scrapNeetCode();
