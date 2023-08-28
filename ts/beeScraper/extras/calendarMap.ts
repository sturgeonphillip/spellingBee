import dayjs from "dayjs";
import { months, week } from "./utils";
import buildFile from "./buildFile";

async function createCalendar(year) {
  const calendar = new Map();
  const leap = year % 4 === 0 ? 29 : 28;

  // loop through 12 months
  for (let i = 0; i < months.length; i++) {
    const name = months[i];
    const month = i + 1;

    //  assign correct number of days per month
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

    // build data map for each month and set on calendar map
    const monthMap = createMonthly(year, month, days);
    calendar.set(name, monthMap);
  }
  // console.log("CALENDAR LOG! HERE:", calendar);
  // await buildFile("calendar", "twentyTwentyThree", calendar);
  return calendar;
}

function createMonthly(year: number, month: number, days: number) {
  const monthlyCalendar = new Map();
  const monthId = digits(month);
  let i = 1;

  while (i <= days) {
    const day = i;
    const dayId = digits(i);
    const dateUrl = `${year}/${monthId}/${dayId}`;

    const dayOfWeek = fullDate(year, month, i);
    const link = `https://www.nytimes.com/${dateUrl}/crosswords/spelling-bee-forum.html`;

    monthlyCalendar.set(day, { dayOfWeek, link });

    i++;
  }
  return monthlyCalendar;
}

function digits(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function fullDate(year: number, month: number, date: number) {
  const dayOfWeek = dayjs(`${year}, ${month}, ${date}`).format(
    "dddd MMMM D, YYYY"
  );

  return dayOfWeek;
}
const twentyTwentyThree = createCalendar(2023);
buildFile("calendar", "twentyTwentyThree", twentyTwentyThree);

export default createCalendar;
