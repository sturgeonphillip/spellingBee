const rawTableString =
  "\t4\t5\t6\t7\t9\tΣ\nA:\t4\t1\t2\t-\t1\t8\nC:\t3\t4\t1\t3\t-\t11\nE:\t1\t-\t1\t-\t-\t2\nL:\t4\t1\t1\t-\t-\t6\nN:\t4\t2\t1\t-\t-\t7\nO:\t2\t1\t-\t-\t-\t3\nW:\t5\t-\t1\t-\t-\t6\nΣ:\t23\t9\t7\t3\t1\t43";

function parseTableObject(str) {
  // instantiate new object
  const table = {};

  console.log(typeof rawTableString);
  // split string into arrays
  const arr = str.split("\n");

  // columns of word length keys
  const lengthKeys = arr[0]
    .split("\t")
    .slice(1)
    .map((x) => x.slice(0, 1));

  // row of [[letter keys], values in columns ]
  const letterAndValues = arr
    .slice(1)
    .map((x) => x.split("\t"))
    .map((x) => {
      const key = x[0][0];
      const values = x.slice(1).map((x) => (x = x === "-" ? "0" : x));
      return [key, values];
    });

  return assignLetterAsKey(table, lengthKeys, letterAndValues);
}

function assignLetterAsKey(tableObject, wordLength, letterAndValues) {
  for (let i = 0; i < letterAndValues.length; i++) {
    // destructure letter to become key
    const [letter, values] = letterAndValues[i];
    // create k:v pair - letter as key with nested object values
    tableObject[letter] = pairLengthQuantity(wordLength, values);
  }

  return tableObject;
}

function pairLengthQuantity(wordLength, quantityAtLength) {
  // instantiate object to hold k:v pairs
  const letterObject = {};

  // pair length and quantity
  for (let i = 0; i < wordLength.length; i++) {
    letterObject[wordLength[i]] = quantityAtLength[i]; // [wL[i]] = wQ[i];
  }

  return letterObject;
}

// const spellingBeeGrid = parseTableObject(rawTableString);
// console.log("FINAL:", spellingBeeGrid);

// final object = {letter: { length: quantity }}
/**
 * final output =>
 *  wordGrid: {
 *    firstLetterInWord: {
 *      lengthOfWord: quantityAtLength
 *    }
 *  }
 */

export default parseTableObject;
