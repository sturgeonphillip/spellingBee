//  	"AB-1 AI-1 AR-4 AT-2 AU-1\n",
// 		"BA-6 BR-5 BU-2\n",
// 		"RA-6\n",
// 		"TA-6 TI-2 TR-3 TU-1\n"

const example = [
  "AB-1 AI-1 AR-4 AT-2 AU-1\n",
  "BA-6 BR-5 BU-2\n",
  "RA-6\n",
  "TA-6 TI-2 TR-3 TU-1\n",
];

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

console.log(parseTwoLetters(example));

function parseTwoAlt(arr) {
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

console.log(parseTwoAlt(example));

export default parseTwoLetters;
