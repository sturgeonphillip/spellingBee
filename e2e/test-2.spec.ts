import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.nytimes.com/2023/01/30/crosswords/spelling-bee-forum.html');
  await page.getByTestId('expanded-dock-heading-selector').click();
});
