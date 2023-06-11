import raw from "./storage/key_value_stores/default/bee-june032023.json" assert { type: "json" };

// import raw from './storage/key_value_stores/default/bee-june032023.json'

const juneTable = raw[0].table[0].split(/\n\s+/g);

const createArrays = (arr) => {
  // find last column (the total quantity of words per letter)
  const sigma = arr.indexOf(String.fromCharCode(931)) + 1; // 8
  // create key of each possible length
  const lengthKeys = arr.slice(1, sigma);

  const matrix = {};
  let temp = [];

  const clean = arr.slice(1, arr.length - 1).map((x) => (x === "-" ? "0" : x));

  for (let i = sigma - 1; i < clean.length; i++) {
    if (temp.length <= sigma) {
      temp.push(clean[i]);
    }

    if (temp.length === sigma) {
      const cleanLetter = temp[0][0];
      matrix[cleanLetter] = toObject(lengthKeys, temp.slice(1));
      temp = [];
    }
  }

  return matrix;
};

function toObject(lengths, values) {
  const obj = {};

  for (let i = 0; i < lengths.length; i++) {
    obj[lengths[i]] = values[i];
  }
  return obj;
}

const juneThree = createArrays(juneTable);
// const matrix = createArrays(data);
// console.log(matrix)
// console.log(matrix['Σ']['Σ']);
console.log(juneThree);

// make sure initial input follows this format
// from raw[0] => data.table[0].split(/\n\s+/g);
const data = [
  "",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Σ",
  "a:",
  "1",
  "2",
  "5",
  "1",
  "1",
  "-",
  "10",
  "c:",
  "4",
  "3",
  "1",
  "1",
  "-",
  "1",
  "10",
  "e:",
  "1",
  "1",
  "-",
  "1",
  "-",
  "-",
  "3",
  "i:",
  "-",
  "-",
  "1",
  "-",
  "-",
  "-",
  "1",
  "p:",
  "3",
  "2",
  "1",
  "1",
  "-",
  "-",
  "7",
  "t:",
  "1",
  "2",
  "1",
  "-",
  "-",
  "-",
  "4",
  "v:",
  "1",
  "-",
  "2",
  "-",
  "-",
  "-",
  "3",
  "Σ:",
  "11",
  "10",
  "11",
  "4",
  "1",
  "1",
  "38",
  "",
];
