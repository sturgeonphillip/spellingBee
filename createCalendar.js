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

export default function createCalendar(year) {
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

    calendar[key] = createMonthly(year, month, days, key);
  }

  return calendar;
}

// 2023, 6, 23, "june"
function createMonthly(year, m, d, key) {
  const monthly = {};
  let i = 1;
  const month = singleDigits(m);
  while (i <= d) {
    const day = singleDigits(i);
    const dateKey = key.concat(day);

    const date = `${year}/${month}/${day}`;
    const url = `https://www.nytimes.com/${date}/crosswords/spelling-bee-forum.html`;

    monthly[dateKey] = { url };
    i++;
  }
  return monthly;
}

function singleDigits(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

// const june = createMonthly(2023, 6, 30, "june");

// const cal = createCalendar(2023);
// console.log(cal);
