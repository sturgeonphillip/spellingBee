// create an array of url strings for each day/month
function createMonth (month, days) {
  const monthLinks = [];
  let curr = 1;

  while (curr <= days) {
    let date = curr < 10 ? `0${curr}` : `${curr}`;
    const link = `https://www.nytimes.com/2023/${month}/${date}/crosswords/spelling-bee-forum.html`;
    monthLinks.push(link);
    curr++;
  }

  return monthLinks;
}

// object of arrays - { month: [links] }
const createCalendar = () => {
  const calendar = new Map();

  // loop through 12 months
  for (let m = 1; m < 13; m++) {
    // reformatted to match url
    const month = m < 10 ? `0${m}` : `${m}`;

    // assign correct number of days per month
    let days;
    switch (m) {
      case 2:
        days = 28;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30;
      default:
        days = 31;
    }    
    // add newly created month of link arrays to calendar
    calendar.set(month, createMonth(month, days))
  }

  return calendar;
};


const calendar = createCalendar();
console.log('calendar', calendar.get('11'));

//  https://www.nytimes.com/2023/05/30/crosswords/spelling-bee-forum.html
// `https://www.nytimes.com/${year}/${month}/${day}/crosswords/spelling-bee-form.html`;
