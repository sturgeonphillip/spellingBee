function parseSigmaTable(str) {
  const table = {};

  const arr = str.split("\n");

  // columns of word length keys
  const wordLengths = arr[0]
    .split("\t")
    .slice(1)
    .map((x) => x.slice(0, 1));

  // row of [[letter - key], values come from columns]
  const letterAndValues = arr
    .slice(1)
    .map((x) => x.split("\t"))
    .map((x) => {
      const key = x[0][0];
      const values = x.slice(1).map((x) => (x = x === "-" ? "0" : x));

      return [key, values];
    });

  return assignLetterAsKey(table, wordLengths, letterAndValues);
}

function assignLetterAsKey(tableObject, wordLength, letterAndValues) {
  for (let i = 0; i < letterAndValues.length; i++) {
    // destructure letter to become key
    const [letter, values] = letterAndValues[i];

    // create k:v - letter as key with nested object values
    tableObject[letter] = pairLengthAndQuantity(wordLength, values);
  }

  return tableObject;
}

function pairLengthAndQuantity(wordLength, quantityAtLength) {
  const letterValues = {};

  // pair length and quantity
  for (let i = 0; i < wordLength.length; i++) {
    letterValues[wordLength[i]] = quantityAtLength[i];
  }

  return letterValues;
}

export default parseSigmaTable;
