// const args = process.argv.slice(2);

// args.forEach((arg, index) => {
//   console.log(`Argument ${index + 1}: ${arg}, length: ${arg.length}`);
// })
function isPalindrome (strA, strB) {
  const pal = strA + strB;
  console.log("PAL", pal)
  const len = pal.length;
  let val;
  for (let i = 0; i < len / 2; i++) {
    if (pal[i] !== pal[len - 1 - i]) {
      val = false;
      break;
    }
  }
  val = true;
  return {
    pal,
    val
  };
}

const functionName = 'isPalindrome';
const input = process.argv.slice(2);
const result = isPalindrome(...input);
const functionOutput = {
  'function': functionName,
  'argument': input,
  'result': result
};


console.log(functionOutput);

// node isPalindrome.js race car =>
