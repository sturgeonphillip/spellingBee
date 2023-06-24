import createCalendar from "../createCalendar.js";

const calendar = createCalendar(2023);

function loopMonths(cal) {
  for (const mon in cal) {
    if (typeof cal[mon] === "object" && cal[mon] !== null) {
      loopMonths(cal[mon]);
    } else if (mon === "url") {
      const url = cal[mon];

      // do something with data
      console.log(url);
    }
  }
}

loopMonths(calendar);

export default loopMonths;
