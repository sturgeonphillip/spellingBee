import createMonthly from "./createMonthly.js";
import beeCrawler from "./crawler.js";

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
  const calendar = new Map();
  const leap = year % 4 === 0 ? 29 : 28;

  // loop through 12 months
  for (let i = 0; i < months.length; i++) {
    const m = i + 1;
    // reformatted to match url
    // const numeral = m < 10 ? `0${m}` : `${m}`;

    // assign correct number of days per month
    let days;
    switch (m) {
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

    // use month as key in calendar object
    calendar[months[i]] = await createMonthly(
      months[i],
      year,
      num,
      days,
      beeCrawler
    );

    // build file
  }

  return calendar;
}

console.log("CALENDAR", createCalendar(2023));

/**
 * january01: {
 * numeric: "",
 * date: Date(dateString),
 * url: '...',
 * beeData: {...}
 * }
 */
