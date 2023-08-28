import dayjs from "dayjs";
// start with months and days
// first day of the year
// use existing function that builds calendar in the create data file
// cut out the process specific to crawling data

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function createCalendarObject(year) {
  const calendar = {};

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

    const monthMap = createMonthlyObject(year, month, days);
    calendar[name] = monthMap;
  }

  return calendar;
}

console.log(createCalendarObject(2023), "boom!");

function createMonthlyObject(year: number, month: number, days: number) {
  const monthlyCalendar = {};
  const monthId = digits(month);
  let i = 1;

  while (i <= days) {
    const day = i;
    const dayId = digits(i);
    const dateUrl = `${year}/${monthId}/${dayId}`;

    const dayOfWeek = fullDate(year, month, i);
    const link = `https://www.nytimes.com/${dateUrl}/crosswords/spelling-bee-forum.html`;

    monthlyCalendar[day] = { dayOfWeek, link };

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
// console.log(createMonthly(2023, 4, 30));
