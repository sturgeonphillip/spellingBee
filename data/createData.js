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

/**
 * january01: {
 * numeric: "",
 * date: Date(dateString),
 * url: '...',
 * beeData: {...}
 * }
 */
createCalendar(2023);
