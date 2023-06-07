import { PlaywrightCrawler, Request, Dataset } from 'crawlee';

const crawler = new PlaywrightCrawler({

  requestHandler: async ({ request, page }) => {
    const title = await page.title();

    // const bold = await page.locator('p.content').locator('nth=1').locator('span').locator('nth=1').textContent()
    const all = await page.locator('p.content').nth(1).innerText();
    const bold = await page.locator('p.content').nth(1).locator('span').first().innerText();
    const standard = await page.locator('p.content').nth(1).locator('span').last().innerText();

    const words = await page.locator('p.content').nth(2);

    const twoLetterList = await page.locator('p.content').nth(4).locator('span').allInnerTexts();

    const table = (await page.locator('table').allTextContents()).concat();

    await Dataset.pushData({
      letters: {
        all, bold, standard
      },
      words,
      twoLetterList,
      table
    });
    
  }
});

// await crawler.run(['https://www.nytimes.com/2023/05/30/crosswords/spelling-bee-forum.html']);
await crawler.run(['https://www.nytimes.com/2023/06/03/crosswords/spelling-bee-forum.html']);
await Dataset.exportToJSON('bee-june032023');
