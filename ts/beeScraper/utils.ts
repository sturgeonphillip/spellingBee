export const months = [
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

export const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function dateFromUrl(url) {
  const dateIdx = parseInt();

  const sliceToDate = url.slice(24, 34).replace(/\//g, "-");
  return sliceToDate;
}

function monthFromUrl(url) {
  const monthIdx = parseInt(url.slice(29, 31)) - 1;
  const month = months[monthIdx];

  return month;
}

function yearFromUrl(url) {
  parseInt(url.slice(24, 28));
  return year;
}

export function createDirectoryPaths(url) {
  return {
    date: dateFromUrl(url),
    month: monthFromUrl(url),
    year: yearFromUrl(url),
  };
}

function loopArr(arr: string[]) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const obj = directoryFromUrl(arr[i]);
    result[i + 1] = obj;
  }
  return result;
}

const april = [
  "https://www.nytimes.com/2023/04/01/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/04/02/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/04/03/crosswords/spelling-bee-forum.html",
  "https://www.nytimes.com/2023/04/04/crosswords/spelling-bee-forum.html",
];

console.log(loopArr(april));
