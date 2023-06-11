import { PlaywrightCrawler, Request, Dataset, Configuration } from "crawlee";
// import fs from "fs";
import parseTableObject from "./parseTableObject.js";
import parsePointTotals from "./parsePointTotals.js";
import parseTwoLetters from "./parseTwoLetterList.js";

export const january = [
  "https://www.nytimes.com/2023/01/01/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/02/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/03/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/04/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/05/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/06/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/07/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/08/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/09/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/10/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/11/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/12/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/13/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/14/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/15/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/16/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/17/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/18/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/19/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/20/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/21/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/22/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/23/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/24/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/25/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/26/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/27/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/28/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/29/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/30/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/01/31/crosswords/spelling-bee-forum.html",
];

Configuration.set("headless", false);

const crawler = new PlaywrightCrawler({
  async requestHandler({ request, page, log }) {
    const all = await page.locator("p.content").nth(1).innerText();
    const letterArray = all.split(" ");
    const bold = letterArray[0];
    const standard = letterArray.slice(1);
    // const bold = await page.locator('p.content').nth(1).locator('span').first().innerText()[0];
    // const standard = await page.locator('p.content').nth(1).locator('span').last().innerText();

    // const filename = request.url.replace(/[^a-zA-Z0-9]/g, '_') + '.json';
    // const bold = await page.locator('p.content').nth(1).locator('span').first().innerText();
    // const standard = await page.locator('p.content').nth(1).locator('span').last().innerText();

    const words = await page.locator("p.content").nth(2).innerText();

    const twoLetterList = await page
      .locator("p.content")
      .nth(4)
      .locator("span")
      .allInnerTexts();

    const tableData = await page.locator("table").allInnerTexts();
    const table = parseTableObject(tableData[0]);
    // console.log("TD1", typeof tableData1[0], tableData1[0]);
    //   const tableData2 = (await page.locator('table').allTextContents()).concat();
    // console.log("TD2", tableData2);

    // const table = parseTableObject(tableData);

    const dailyBeeData = {
      letters: {
        all,
        bold,
        standard,
      },
      points: parsePointTotals(words),
      twoLetterList: parseTwoLetters(twoLetterList),
      table: parseTableObject(tableData),
    };

    await Dataset.pushData(dailyBeeData);

    const fileName = `bee/${request.url.slice(24, 34)}.json`;
    // // const fileName = request.url.replace(/[^a-zA-z0-9]/g, '_') + '.json';
    //   fs.writeFileSync(fileName, JSON.stringify(data));
    //   log.info(`saved file: ${fileName}`);
  },
});

// await crawler.run(january)
await crawler.run([
  "https://www.nytimes.com/2023/01/03/crosswords/spelling-bee-forum.html",
]);
await Dataset.exportToJSON("bee-01032023");
