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

// create
function createFileUrl(calendar, month, days) {
  const monthLinks = {};
  let curr = 1;

  while (curr <= days) {
    let date = curr < 10 ? `0${curr}` : `${curr}`;
    const fileName = `${calendar}${date}`;
    const link = `https://www.nytimes.com/2023/${month}/${date}/crosswords/spelling-bee-forum.html`;
    // monthLinks.push(link);
    monthLinks[fileName] = link;
    curr++;
  }
  return monthLinks;
}

// object of arrays - { month: [{fileName:link}, {fileName:link}, etc] }
export default function createCalendar(year) {
  const calendar = new Map();
  const leap = year % 4 === 0 ? 29 : 28;

  // loop through 12 months
  for (let i = 0; i < months.length; i++) {
    const m = i + 1;
    // reformatted to match url
    const numeral = m < 10 ? `0${m}` : `${m}`;

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

    // add newly created month of link arrays to calendar
    calendar.set(
      months[i],
      // createMonthFile(month, days),
      createFileUrl(months[i], numeral, days, year)
    );
  }

  return calendar;
}
