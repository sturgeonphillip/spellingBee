export interface CreateMonthlyProps {
  year: number;
  monthAsWord: string;
  monthAsNumber: number;
  days: number;
  crawler: any;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

async function createMonthly(year, month, days, monthAsWord) {
  const monthlyCalendar = {};
  let i = 1;

  while (i <= days) {
    const fileName = `${i}`;
    const urlLink = createLink(year, month, i);
    // const fullDate = assignDayToDate(month, firstDay);

    monthlyCalendar[fileName] = {
      date: fullDate,
      url: urlLink,
    };

    i++;
  }

  return monthlyCalendar;
}

async function createLink(year, mon, i) {
  // key within month calendar
  const day = singleDigit(i);
  const month = singleDigit(mon);

  const date = `${year}/${month}/${day}`;

  const link = `https://www.nytimes.com/${date}/crosswords/spelling-bee-forum.html`;

  return link;
}

function singleDigit(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function assignDayToDate(month, firstDay, totalDays) {
  const calendar: string[] = [];
  let i = 1;
  let j = days.indexOf(firstDay);

  while (i <= totalDays) {
    const date = `${days[j]} ${month} ${i}, 2023`;
    calendar.push(date);

    j === 6 ? (j = 0) : j++;
    i++;
  }

  return calendar;
}

console.log(assignDayToDate("April", "Saturday", 30));

const april = await createMonthly(2023, "april", 4, 30);
export default createMonthly;

console.log(april);
