import { PlaywrightCrawler, Dataset } from "crawlee";
import {
  parsePointTotals,
  parseSigmaTable,
  parseTwoLetters,
} from "./parsers/index.js";

async function beeCrawler(url: string) {
  const crawler = new PlaywrightCrawler({
    // slow the amount of requests run at once
    // maxConcurrency: 5,

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

      const dailyBeeData = {
        letters: {
          allLetters,
          bold,
          standard,
        },
        points: parsePointTotals(words),
        twoLetterList: parseTwoLetters(twoLetterList),
        table: parseSigmaTable(tableData),
      };

      Dataset.pushData(dailyBeeData);
    },
  });
  await crawler.addRequests([url]);

  await crawler.run();

  const beeData = await Dataset.open();
  const data = await beeData.getData();
  console.log(beeData);
  // build data

  beeData.drop();
}

const date = "2023/04/23";

const dateURL = `https://www.nytimes.com/${date}/crosswords/spelling-bee-forum.html`;

beeCrawler(dateURL);

export default beeCrawler;
