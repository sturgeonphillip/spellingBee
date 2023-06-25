import beeCrawler from "./data/crawler.js";

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

async function createMonth(year) {
  const calendar = {};

  const leap = year % 4 === 0 ? 29 : 28;

  // loop through each month
  for (let i = 0; i < months.length; i++) {
    const key = months[i];
    const month = i + 1;

    // assign quantity of days per month
    let days;
    switch (month) {
      case 2:
        days = leap;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30;
        break;
      default:
        days = 31;
    }

    calendar[key] = createDays(year, month, days, key);

    const time = i * 4000;
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          "getting bee data...",
          "next interval:",
          `${time / 1000} seconds`.toString()
        );
        resolve();
      }, time);
    });

    return calendar;
  }
}
// 2023, 6, 23, "june"
async function createDays(year, m, d, key) {
  console.log("creating", key, "now!");
  const monthly = {};
  let i = 1;
  const month = singleDigits(m);
  while (i <= d) {
    const day = singleDigits(i);
    // const dateKey = key.concat(day);

    const date = `${year}/${month}/${day}`;
    // const file = date.match(/[\d{4}]/g).join("");
    const file = date.replace(/\//g, "-");
    const url = `https://www.nytimes.com/${date}/crosswords/spelling-bee-forum.html`;
    const data = await beeCrawler(url);
    monthly[file] = {
      url,
      data,
    };
    i++;
  }
  console.log(monthly);
  console.log("RETURN MONTHLY!");
  return monthly;
}

function singleDigits(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

// const june = createMonthly(2023, 6, 30, "june");
// const july = createMonthly(2023, 7, 31, "july");
const twentyTwentyThree = daysPerMonth(2023);
console.log(twentyTwentyThree);

// daysPerMonth;
