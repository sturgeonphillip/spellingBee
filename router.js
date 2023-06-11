import { createPlaywrightRouter, Dataset, Request } from "crawlee";

export const router = createPlaywrightRouter();

router.use(async ({ page }) => {
  const title = await page.title();
  console.log(title);
});

router.addDefaultHandler(async ({ page, crawler }) => {
  // do something
  // create request queue
  // get urls from database (?)
  // where should I store data?
  // operate the request currently in `./index.js` on all links.
});
