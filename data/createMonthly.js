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

    // console.log(crawler);
    // const js = new Date(date);
    const bee = crawler ? await crawler(link) : "bee!";
    const data = {
      fileName,
      date,
      link,
      // js
      bee,
    };

    monthlyCalendar[fileName] = data;

    i++;
  }

  return monthlyCalendar;
}

function singleDigit(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default createMonthly;
