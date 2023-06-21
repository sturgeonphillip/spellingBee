import { PlaywrightCrawler, Dataset } from "crawlee";
import { firefox } from "playwright";

import parsePointTotals from "./parsers/pointTotals.js";
import parseTableObject from "./parsers/tableObject.js";
import parseTwoLetters from "./parsers/twoLetterList.js";

async function beeCrawler(url) {
  const crawler = new PlaywrightCrawler({
    // slow the amount of requests run at once
    maxConcurrency: 5,
    maxRequestsPerCrawl: 5,
    maxRequestsPerMinute: 100,

    async requestHandler({ page }) {
      const allLetters = await page.locator("p.content").nth(1).innerText();

      const letterArray = allLetters.split(" ");

      const bold = letterArray[0];
      const standard = letterArray.slice(1);

      const words = await page.locator("p.content").nth(2).innerText();

      const twoLetterList = await page
        .locator("p.content")
        .nth(4)
        .locator("span")
        .allInnerTexts();

      const tableData = await page.locator("table").innerText();

      const dailyBeeData = await {
        letters: {
          allLetters,
          bold,
          standard,
        },
        points: parsePointTotals(words),
        twoLetterList: parseTwoLetters(twoLetterList),
        table: parseTableObject(tableData),
      };

      Dataset.pushData(dailyBeeData);
    },
  });
  await crawler.addRequests([url]);

  await crawler.run();

  const beeData = await Dataset.open();
  const data = await beeData.getData();

  return data;
}

export default beeCrawler;
