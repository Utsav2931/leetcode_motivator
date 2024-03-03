const puppeteer = require("puppeteer");

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
    const hrefs = [];
    const problemNames = [];
    const difficulties = [];

    console.log(tableElements.length);

    for (const tableElement of tableElements) {
      // This will contain question name and href to the leetcode.
      const anchorElement = await tableElement.$("a");

      const problemName = await page.evaluate(
        (el) => el.textContent,
        anchorElement
      );
      if (problemName === "") continue;

      const hrefValue = await page.evaluate(
        (el) => el.getAttribute("href"),
        anchorElement
      );

      if (!hrefValue.includes("leetcode.com/problems")) continue;

      // This will contain difficulty of the question.
      const bElement = await tableElement.$("b");
      const difficulty = await page.evaluate((el) => el.innerHTML, bElement);

      problemNames.push(problemName);
      hrefs.push(hrefValue);
      difficulties.push(difficulty);
    }

    // for (const tableElement of tableElements) {
    //   const tableValue = await page.evaluate(
    //     (el) => el.textContent,
    //     tableElement,
    //   );
    //   if (tableValue === "") continue;
    //   const hrefValu = await page.evaluate(
    //     (el) => el.getAttribute("href"),
    //     tableElement,
    //   );
    //   if (!hrefValu.includes("leetcode.com/problems")) continue;
    //   problemNames.push(tableValue);
    //   hrefs.push(hrefValu);
    // }
    for (let i = 0; i < problemNames.length; i++) {
      console.log(problemNames[i] + " " + hrefs[i] +" " + difficulties[i]);
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
