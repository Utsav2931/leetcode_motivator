const puppeteer = require("puppeteer");

const scrapNeetCode = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto("https://neetcode.io/practice");
    const elements = await page.$$("ul .tab-link");
    for (const element of elements) {
      const value = await page.evaluate((el) => el.innerHTML, element);
      if (value.includes("NeetCode All")) {
        await element.click();
        console.log("Element clicked");
      }
      console.log(value);
    }
    // await element.dispose();
    const tableElements = await page.$$("td>a");
    const hrefs = [];
    const problemNames = [];

    for (const tableElement of tableElements) {
      const tableValue = await page.evaluate(
        (el) => el.textContent,
        tableElement,
      );
      if (tableValue === "") continue;
      const hrefValu = await page.evaluate(
        (el) => el.getAttribute("href"),
        tableElement,
      );
      if (!hrefValu.includes("leetcode.com/problems")) continue;
      problemNames.push(tableValue);
      hrefs.push(hrefValu);
    }
    for (let i = 0; i < problemNames.length; i++) {
      console.log(problemNames[i] + " " + hrefs[i]);
    }
    console.log(hrefs.length);
  } catch (e) {
    console.log("An error occured:", e);
  } finally {
    // Close the browser.
    await browser.close();
  }
};

scrapNeetCode();
