function parseTwoLetters(arr) {
  const core = {};

  arr = arr.map((x) => x.replace(/\n+/g, ""));

  for (let i = 0; i < arr.length; i++) {
    const letter = arr[i][0];
    const letterArr = arr[i].split(" ").map((x) => x.split("-"));

    core[letter] = Object.fromEntries(letterArr);
  }

  return core;
}

export default parseTwoLetters;

function parseTwoLettersAlt(arr) {
  const core = {};

  arr = arr.map((x) => x.replace(/\n+/g, ""));

  for (let i = 0; i < arr.length; i++) {
    const letter = arr[i][0];
    const letterArr = arr[i].split(" ").map((x) => {
      const keyValue = x.split("-");
      return [keyValue[0][1], keyValue[1]];
    });

    core[letter] = Object.fromEntries(letterArr);
  }

  return core;
}
