import createCalendar from "./createDates.js";

const calendar = createCalendar();

// regex to match date format in URL
const dateRegex = /\d{4}\/\d{2}\/\d{2}/g;

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
        // run crawler on link
      }
    }
  }
}

console.log(runCrawlerOnCalendar(calendar));

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
