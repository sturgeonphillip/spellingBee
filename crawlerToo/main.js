import { PlaywrightCrawler, Dataset } from "crawlee";
import * as parsers from "../parsers/index.js";
import loopMonths from "./loopMonths.js";
async function beeCrawler(url) {
  console.log("bees...");
  console.log(url);
  const crawler = new PlaywrightCrawler({
    // slow quantity of requests run at same tim
    maxConcurrency: 5,

    async requestHandler({ page }) {
      const letters = await page
        .locator("p.content")
        .nth(1)
        .innerText()
        .split(" ");

      const bold = letters[0];
      const standard = letters.slice(1);

      const points = await page.locator("p.content").nth(2).innerText();

      const twoLetterClues = await page
        .locator("p.content")
        .nth(4)
        .locator("span")
        .allInnerTexts();

      const sigmaTableData = await page.locator("table").innerText();

      const dailyBeeData = await {
        letters: {
          all: letters,
          bold,
          standard,
        },
        points: parsers.parsePointTotals(points),
        twoLetterList: parsers.parseTwoLetterList(twoLetterClues),
        table: parsers.parseSigmaTable(sigmaTableData),
      };
    },
  });

  // loop into each month and run crawler
  // then build file for each month individually
  const needed = [];
  needed.push(url);

  // await crawler.addRequests([url]);

  // await crawler.run();

  // const dataset = await Dataset.open();

  // const bee = await dataset.getData();

  console.log(needed, "buzz!");
}

beeCrawler(
  "https://www.nytimes.com/2023/06/21/crosswords/spelling-bee-forum.html"
);
