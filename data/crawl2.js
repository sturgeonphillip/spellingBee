import { Dataset, PlaywrightCrawler, RequestQueue } from "crawlee";

async function crawlBee() {
  // create whole month of links and data needs

  const crawler = new PlaywrightCrawler({
    // make some requests, etc

    async requestHandler({ page }) {
      const all = await page.locator("p.content").nth(1).innerText();
    },
  });

  await crawler.addRequests(["https://wwww.nytimes.com/2023/04/11"]);

  await crawler.run();

  const dataset = await Dataset.open();
  const bee = await dataset.getData();

  buildFile(bee);
}
// crawlBee();

export default crawLBee;
