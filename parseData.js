import fs from "fs";
import raw from "./storage/key_value_stores/default/bee-june032023.json" assert { type: "json" };
const data = raw[0];

const letters = data.letters;
const all = data.letters.all.replace(/\s+/g, "");
const words = data.words;
const twoLetterList = data.twoLetterList;
const table = data.table[0]; //split(/\n\s+/g);
const workTable = data.table[0].split(/\n\s+/g);
console.log("able", workTable);

// May 30, 2023 table as a string
// 456789Σa:12511-10c:4311-110e:11-1--3i:--1---1p:3211--7t:121---4v:1-2---3Σ:11101141138 CAEIPTV

function createObj(data, all) {
  const grid = {};
  const sigma = String.fromCharCode(931);

  for (let key of all) {
    grid[key] = {};
  }
  let j = data.indexOf(sigma) - 1;

  for (let i = 0; i < data.length; i++) {
    if (data[i].match(/[a-zA-Z]\:+/g)) {
    }
    j++;
  }
}

const obj = createObj(table, all);
// console.log(obj);

// fs.writeFile('table.js', table, (err) => {
//   if (err) {

//     throw err;
//   }

// });

/**
 const inputArray = [
   '', '4', '5', '6', '7', '8', '9', 'Σ',
 'a:', '1', '2', '5', '1', '1', '-', '10',
 'c:', '4', '3', '1', '1', '-', '1', '10',
 'e:', '1', '1', '-', '1', '-', '-', '3',
 'i:', '-', '-', '1', '-', '-', '-', '1',
 'p:', '3', '2', '1', '1','-',  '-',  '7',
 't:', '1', '2', '1', '-', '-', '-', '4',
 'v:', '1', '-', '2', '-', '-', '-', '3',
 'Σ:', '11','10','11','4', '1', '1', '38',
];
 */

const organized = {
  a: { 4: 5, 5: 2, 6: 5, 7: 1, 8: 1, 9: 0, Σ: 10 },
  c: { 4: 4, 5: 3, 6: 1, 7: 1, 8: 0, 9: 1, Σ: 10 },
  e: { 4: 1, 5: 1, 6: 0, 7: 1, 8: 0, 9: 0, Σ: 3 },
  i: { 4: 0, 5: 0, 6: 1, 7: 0, 8: 0, 9: 0, Σ: 0 },
  p: { 4: 3, 5: 2, 6: 1, 7: 1, 8: 0, 9: 0, Σ: 7 },
  t: { 4: 1, 5: 2, 6: 1, 7: 0, 8: 0, 9: 0, Σ: 4 },
  v: { 4: 1, 5: 0, 6: 2, 7: 0, 8: 0, 9: 0, Σ: 3 },
  Σ: { 4: 11, 5: 10, 6: 11, 7: 4, 8: 1, 9: 1, Σ: 38 },
  // ...
};

/***
i: 0 CAEIPTVΣ C
- 1 CAEIPTVΣ A
- 2 CAEIPTVΣ E
1 3 CAEIPTVΣ I
- 4 CAEIPTVΣ P
- 5 CAEIPTVΣ T
- 6 CAEIPTVΣ V
1 7 CAEIPTVΣ Σ
p: 0 CAEIPTVΣ C
3 1 CAEIPTVΣ A
2 2 CAEIPTVΣ E
1 3 CAEIPTVΣ I
1 4 CAEIPTVΣ P
- 5 CAEIPTVΣ T
- 6 CAEIPTVΣ V
7 7 CAEIPTVΣ Σ
t: 0 CAEIPTVΣ C
1 1 CAEIPTVΣ A
2 2 CAEIPTVΣ E
1 3 CAEIPTVΣ I
- 4 CAEIPTVΣ P
- 5 CAEIPTVΣ T
- 6 CAEIPTVΣ V
4 7 CAEIPTVΣ Σ
v: 0 CAEIPTVΣ C
1 1 CAEIPTVΣ A
- 2 CAEIPTVΣ E
2 3 CAEIPTVΣ I
- 4 CAEIPTVΣ P
- 5 CAEIPTVΣ T
- 6 CAEIPTVΣ V
3 7 CAEIPTVΣ Σ
 */
