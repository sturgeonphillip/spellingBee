import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: false
});

const page = await browser.newPage({
  bypassCSP: true
});

await page.goto("https://www.nytimes.com/2023/05/30/crosswords/spelling-bee-forum.html");

// await page.click("text=TUESDAY");

await page.waitForFunction(() => {
  // <h2 class="css-kypbrf eoo0vm40" id="link-607cef65">Spelling Bee Grid</h2>

  // const selector = "#\33 0sb-forum-2023-05-30";
  // const jsPath = document.querySelector("#\\33 0sb-forum-2023-05-30");
  // const xPath = "*[@id="30sb - forum - 2023-05 - 30"]";
  // const fullXPath = "/html/body/div/div/div/div[2]/main/div/article/section/div[4]/section";

  const content = document.querySelectorAll("p.content");

  console.log("CONTENT");
  // console.log(content);
  // return content;

});

const letters = await page.$$eval("p.content", (p) => {
  
  return p.map((el) => {
    // const centerLetter = el.querySelectorAll("div.interactive-body>div>p>span").innerHtml()
    
    // div.interactive-body>div>p>span
    const data = el.querySelectorAll("div.interactive-body>div>p");
    return data.toString();
    
    
  })
});

console.log(letters);





await page.waitForTimeout(3000);
await browser.close();


// const styles = {
//   "color": "#333",
//   "padding": "0",
//   "border": "0",
//   "text-size-adjust": "100%",
//   "font": "inherit",
//   "vertical-align": "baseline",
//   "display": "block",
//   "height": "auto",
//   "margin": "2.3125rem auto",
//   "width": "calc(100% - 20px)",
//   "max-width": "600px"
// };
/**
 *  color: #333;
 *  padding: 0;
 *  border: 0;
 *  text-size-adjust: 100%;
 *  font: inherit;
 *  vertical-align: baseline;
 *  display: block;
 *  height: auto;
 *  margin: 2.3125rem auto;
 *  width: calc(100% - 20px);
 *  max-width: 600px;
 */
