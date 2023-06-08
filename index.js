import { PlaywrightCrawler, Request, Dataset, Configuration } from 'crawlee';
import { Actor } from 'apify'
import fs from 'fs';

const january = [
  'https://www.nytimes.com/2023/01/01/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/02/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/03/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/04/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/05/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/06/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/07/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/08/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/09/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/10/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/11/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/12/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/13/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/14/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/15/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/16/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/17/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/18/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/19/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/20/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/21/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/22/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/23/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/24/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/25/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/26/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/27/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/28/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/29/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/30/crosswords/spelling-bee-forum.html',
  'https://www.nytimes.com/2023/01/31/crosswords/spelling-bee-forum.html'
];

Actor.init();
Configuration.set('headless', false);

// const proxyConfiguration = await Actor.createProxyConfiguration({
//   password: 'apify_proxy_B986aD1WRxl8ai3eFRctnjk0xH6HlR1mmDiM'
// })


const crawler = new PlaywrightCrawler({
 
  

  async requestHandler ({ request, page, log }) {
    
    const all = await page.locator('p.content').nth(1).innerText();
    const bold = await page.locator('p.content').nth(1).locator('span').first().innerText();
    const standard = await page.locator('p.content').nth(1).locator('span').last().innerText();

    

    // const filename = request.url.replace(/[^a-zA-Z0-9]/g, '_') + '.json';
        
      
    // const bold = await page.locator('p.content').nth(1).locator('span').first().innerText();
    // const standard = await page.locator('p.content').nth(1).locator('span').last().innerText();

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

    const fileName = `bee/${request.url.splice(24, 34)}.json`;
    // const fileName = request.url.replace(/[^a-zA-z0-9]/g, '_') + '.json';
      fs.writeFileSync(fileName, JSON.stringify(data));
      log.info(`saved file: ${fileName}`);
  }
  })
    

await crawler.run(january)
await Dataset.exportToJSON('bee-may302023');
await Actor.exit()
