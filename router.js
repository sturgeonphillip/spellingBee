import {
  createPlaywrightRouter,
  // Dataset,
  // Request,
  // RequestQueue,
} from "crawlee";

export const router = createPlaywrightRouter();

router.use(async ({ page }) => {
  const title = await page.title();
});

router.addDefaultHandler(async ({ page, crawler }) => {
  // urls from a request queue
  // parse data, format for frontend, store to db
  // operate the request currently in `./index.js` on all links
});

await crawler.run();
