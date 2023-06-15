import fs from "fs";

import { PlaywrightCrawler, Request, Dataset } from "crawlee";
import parseTableObject from "./parsers/tableObject.js";
import parsePointTotals from "./parsers/pointTotals.js";
import parseTwoLetters from "./parsers/twoLetterList.js";

const crawler = new PlaywrightCrawler({
  async requestHandler({ request, page }) {
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

    // const tableData = await page.locator("table").allInnerTexts();

    // *******************************

    const tableDataE = await page.locator("table").innerText();
    console.log("TABLE DATA E", tableDataE);
    // const dataContent = JSON.parse(tableDataE);
    // console.log(dataContent);
    await fs.writeFile("tableDataE", JSON.stringify(tableDataE, null, 2));

    // *******************************
    const dailyBeeData = {
      letters: {
        all,
        bold,
        standard,
      },
      points: parsePointTotals(words),
      twoLetterList: parseTwoLetters(twoLetterList),
      table: tableData,
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
