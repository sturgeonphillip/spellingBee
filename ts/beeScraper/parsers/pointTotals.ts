function parsePointTotals(str) {
  const subArrays = str.split(", ").map((x) => x.split(":"));

  if (subArrays.length === 4) {
    subArrays[3] = ["BINGO", true];
  } else {
    subArrays[3] = ["BINGO", false];
  }

  return Object.fromEntries(subArrays);
}

export default parsePointTotals;
