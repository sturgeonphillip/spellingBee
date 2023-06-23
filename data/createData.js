import beeCrawler from "./crawler.js";
import createMonthly from "./createMonthly.js";
import buildFile from "./buildFile.js";

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

export default async function createCalendar(year) {
  const calendar = {};
  const leap = year % 4 === 0 ? 29 : 28;

  // loop through 12 months
  for (let i = 0; i < months.length; i++) {
    const monthAsKey = months[i];
    const month = i + 1;

    // assign correct number of days per month
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

    const time = i * 2000;
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

    const beeData = await createMonthly(
      monthAsKey,
      year,
      month,
      days,
      beeCrawler
    );

    calendar[monthAsKey] = beeData;

    await buildFile("beeData", monthAsKey, beeData);
  }

  return await calendar;
}

createCalendar(2023);
