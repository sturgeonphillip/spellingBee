// import buildFile from "./buildFile.js";

async function createMonthly(word, year, num, days, crawler) {
  const monthlyCalendar = {};
  let i = 1;
  const month = singleDigit(num);

  while (i <= days) {
    // key within month calendar
    const day = singleDigit(i);

    const date = `${year}/${month}/${day}`;
    const link = `https://www.nytimes.com/${date}/crosswords/spelling-bee-forum.html`;

    const fileName = `${word}${day}`;
    const monthlyData = await crawler(link);

    const data = await {
      fileName,
      date,
      link,
      monthlyData,
    };

    monthlyCalendar[fileName] = data;

    // build file
    // await buildFile(word, fileName, data);

    i++;
  }

  return monthlyCalendar;
}

function singleDigit(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

// const upper = (str) => str.toUpperCase();
// const april = await createMonthly("april", 2023, 4, 30, upper);
// console.log(april);
export default createMonthly;

// const calendar = {};
// const monthKey = "may";
// const month = 5;
// const days = 31;
// const allDogs = "All Dogs Go To Heaven";
// calendar["allDogs"] = allDogs;
// calendar[monthKey] = await createMonthly(monthKey, 2023, month, days, upper);
// console.log(calendar);
/**
 *
 * [Running] node "/Users/sturgeonphillip/SE/projects/spellingBee/data/createMonthly.js"
 * HTTPS://WWW.NYTIMES.COM/2023/05/01/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/02/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/03/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/04/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/05/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/06/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/07/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/08/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/09/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/10/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/11/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/12/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/13/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/14/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/15/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/16/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/17/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/18/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/19/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/20/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/21/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/22/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/23/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/24/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/25/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/26/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/27/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/28/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/29/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/30/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 * HTTPS://WWW.NYTIMES.COM/2023/05/31/CROSSWORDS/SPELLING-BEE-FORUM.HTML
 *
 * */
