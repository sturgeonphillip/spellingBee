import { readFile, writeFile, access, stat, mkdir } from "fs/promises";
import { join } from "path";
import beeCrawler from "./beeCrawler.js";

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

async function createCalendar(year) {
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

    const monthData = createDays(year, month, days, key);

    calendar[key] = monthData;
    await createMonth("beeData", key, monthData);

    const time = i * 4000;
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(
          "getting bee data...",
          "next interval:",
          `${time / 1000} seconds`.toString()
        );
        resolve();
      }, time);
    });
  }

  return await calendar;
}

// 2023, 6, 23, "june"
async function createDays(year, m, d, key) {
  const today = new Date().toString();

  console.log("creating", key, "now!");
  const monthly = {};
  let i = 1;
  const month = singleDigits(m);
  while (i <= d) {
    const day = singleDigits(i);
    // const dateKey = key.concat(day);

    const date = `${year}/${month}/${day}`;
    // const file = date.match(/[\d{4}]/g).join("");
    const file = date.replace(/\//g, "-");
    const url = `https://www.nytimes.com/${date}/crosswords/spelling-bee-forum.html`;

    const check = new Date(date).toString();
    let bee;
    if (check <= today) {
      bee = await beeCrawler(url);
    } else {
      bee = "come back tomorrow.";
    }

    monthly[file] = {
      url,
      bee,
    };
    i++;
  }
  console.log(monthly);
  console.log("RETURN MONTHLY!");

  return await monthly;
}

// createMonth(2023, 6, 30, "june");
// const july = createMonthly(2023, 7, 31, "july");
// const twentyTwentyThree = daysPerMonth(2023);
// console.log(twentyTwentyThree);

async function createMonth(folder, file, dataToWrite) {
  const directory = folder.toLowerCase();

  const fileName = join(directory, `${file}.json`);
  // create directory if it doesn't yet exist
  try {
    await stat(directory);
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(directory, { recursive: true });
    } else {
      console.log("there was an error while writing to the folder.");
      throw error;
    }
  }

  // create file if it doesn't exist
  try {
    await access(fileName);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(fileName, "{}", { flag: "w" });
    } else {
      console.log("there was an error while writing to the file.");
    }
  }

  // read content
  const fileContent = await readFile(fileName, "utf-8");
  const data = JSON.parse(fileContent);

  // write updated data to the file
  Object.assign(data, dataToWrite);
  await writeFile(file, JSON.stringify(data, null, 2));
}

function singleDigits(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

createCalendar(2023);
export default createCalendar;
