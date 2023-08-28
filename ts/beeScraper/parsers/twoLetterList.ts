function parseTwoLetters(arr: string[]) {
  const result = {};

  arr = arr.map((x) => x.replace(/\n+/g, ""));

  for (let i = 0; i < arr.length; i++) {
    const letter = arr[i][0];
    const letterArray = arr[i].split(" ").map((x) => x.split("-"));

    result[letter] = Object.fromEntries(letterArray);
  }

  return result;
}

export default parseTwoLetters;

// alt method avail in js file
