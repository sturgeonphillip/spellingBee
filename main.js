import { PlaywrightCrawler, Dataset } from "crawlee";
import { buildFile } from "./buildFile.js";

import parsePointTotals from "./parsers/pointTotals.js";
import parseTableObject from "./parsers/tableObject.js";
import parseTwoLetters from "./parsers/twoLetterList.js";

import { runCrawlerOnCalendar } from "./crawlCalendar.js";

const crawler = new PlaywrightCrawler({
  async requestHandler({ page }) {
    const allLetters = await page
      .locator("p.content")
      .nth(1)
      .innerText()
      .trim();

    const letterArray = allLetters.split(" ");
    const bold = letterArray[0].trim();
    const standard = letterArray.slice(1);

    const words = await page.locator("p.content").nth(2).innerText();

    const twoLetterList = await page
      .locator("p.content")
      .nth(4)
      .locator("span")
      .allInnerTexts();

    const tableData = await page.locator("table").innerText();

    const dailyBeeData = {
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

// await crawler.run([
//   "https://www.nytimes.com/2023/01/04/crosswords/spelling-bee-forum.html",
// ]);

// const calendar = createCalendar();
// const dataset = await Dataset.open();
// const data = await dataset.getData();
