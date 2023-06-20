function extractDateFromUrl(url) {
  // Regular expression to match the date format in the url
  const dateRegex = /\d{4}\/\d{2}\/\d{2}/;
  // Extract the date portion from the url
  const match = url.match(dateRegex);

  if (match) {
    // Return the extracted date
    return match[0];
  } else {
    // Handle the case when the url doesn't match the expected format
    throw new Error("Invalid URL format");
  }
}

// const url =
//   "https://www.nytimes.com/2023/06/01/crosswords/spelling-bee-forum.html";
// const urlDate = extractDateFromURL(url);
// const date = new Date(urlDate);

// console.log(date);
const dates = [
  "https://www.nytimes.com/2023/06/01/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/02/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/03/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/04/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/05/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/06/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/07/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/08/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/09/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/10/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/11/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/12/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/13/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/14/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/15/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/16/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/17/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/18/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/19/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/20/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/21/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/22/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/23/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/24/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/25/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/26/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/27/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/28/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/29/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/06/30/crosswords/spelling-bee-forum.html",
];

// console.log(dates);
const calDateStrings = dates.map((x) => extractDateFromUrl(x));
// console.log(calDateStrings);

const asDates = calDateStrings.map((x) => new Date(x));
// console.log(asDates);
