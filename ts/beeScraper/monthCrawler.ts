import { PlaywrightCrawler, Dataset } from "crawlee";
import { parsePointTotals, parseSigmaTable, parseTwoLetters } from "./parsers";
import buildFile from "./buildFile";
import { monthFromUrl } from "./utils";

async function monthCrawler(url) {
  const crawler = new PlaywrightCrawler({
    // maxConcurrency: 5,

    async requestHandler({ page }) {
      // console.log(proxyInfo);
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

      const currentIndex = page.url();
      const dailyBeeData = {
        currentIndex: currentIndex,
        letters: {
          allLetters,
          bold,
          standard,
        },
        points: parsePointTotals(words),
        twoLetterList: parseTwoLetters(twoLetterList),
        table: parseSigmaTable(tableData),
      };

      console.log("month of data:", month);
      console.log("data for", url[0]);
      console.log(dailyBeeData);

      const sliceUrl = currentIndex.slice(24, 34).replace(/\//g, "-");
      console.log(sliceUrl);
      buildFile(`checkFileHere/${month}`, sliceUrl, dailyBeeData);
      await Dataset.pushData({ sliceUrl: dailyBeeData });

      await page.close();
    },
  });

  await crawler.addRequests(url);
  await crawler.run();
  await crawler.teardown();
}

export default monthCrawler;

const june = [
  "https://www.nytimes.com/2023/05/01/crosswords/spelling-bee-forum.html", // I D E G L O Y
  "https://www.nytimes.com/2023/05/02/crosswords/spelling-bee-forum.html", // Y A C D E I N
  "https://www.nytimes.com/2023/05/03/crosswords/spelling-bee-forum.html", // I A L M O R T
  "https://www.nytimes.com/2023/05/04/crosswords/spelling-bee-forum.html", // B A D I M N R
];

monthCrawler(june);
