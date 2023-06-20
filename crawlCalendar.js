import createCalendar from "./createDates.js";
import { buildFile } from "./buildFile.js";
const calendar = createCalendar();

// regex to match date format in URL
const dateRegex = /\d{4}\/\d{2}\/\d{2}/g;

// buildFile(folder, file, dataToWrite)

export async function runCrawlerOnCalendar(calendar) {
  const today = new Date();

  // iterate over keys of calendar
  for (const month of calendar.keys()) {
    // retrieve corresponding array of urls for each month
    const urls = calendar.get(month);
    // iterate each url and run the crawler
    for (const url in urls) {
      const urlDate = extractDateFromUrl(urls[url]);

      const date = new Date(urlDate);

      if (date <= today) {
        // folder stores files according to month
        const monthDirectory = month.toUpperCase();
        console.log("folder", monthDirectory);

        // file name
        const nameFile = url;
        console.log("file", nameFile);

        // run crawler on link
        const linkToCrawl = urls[url];
        // console.log("link to crawl", linkToCrawl);

        const dataForFile = runTheCrawlerOnThisLink(linkToCrawl);

        buildFile(monthDirectory, nameFile, dataForFile);
      }
    }
  }
}

// console.log(
runCrawlerOnCalendar(calendar);
// );

function extractDateFromUrl(url) {
  // Regular expression to match the date format in the URL
  const dateRegex = /\d{4}\/\d{2}\/\d{2}/;
  // Extract the date portion from the URL
  const match = url.match(dateRegex);

  if (match) {
    // Return the extracted date
    return match[0];
  } else {
    // Handle case when URL doesn't match the expected format
    throw new Error("Invalid URL format");
  }
}

console.log(
  extractDateFromUrl(
    "https://www.nytimes.com/2023/06/05/crosswords/spelling-bee-forum.html"
  )
);
