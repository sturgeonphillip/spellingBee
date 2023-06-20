function parseTableObject(str) {
  // instantiate new object
  const table = {};

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
    tableObject[letter] = pairLengthAndQuantity(wordLength, values);
  }

  return tableObject;
}

function pairLengthAndQuantity(wordLength, quantityAtLength) {
  // instantiate object to hold k:v pairs
  const letterObject = {};

  // pair length and quantity
  for (let i = 0; i < wordLength.length; i++) {
    letterObject[wordLength[i]] = quantityAtLength[i];
  }

  return letterObject;
}

export default parseTableObject;
