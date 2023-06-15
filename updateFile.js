import { readFile, writeFile, access, stat, mkdir } from "fs/promises";
import { join } from "path";

// const monthStr = "october";
// const directoryPath = monthStr.toLowerCase();
// const fileName = join(monthStr.toLowerCase(), "dates.json");

async function updateFile(directory, fileName) {
  try {
    // check if directory exists
    await stat(directory);
  } catch (error) {
    // if the directory doesn't exist, create it
    if (error.code === "ENOENT") {
      await mkdir(directory);
    } else {
      throw error;
    }
  }

  // check if file exists
  try {
    await access(fileName);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(fileName, "{}", { flag: "a" });
    } else {
      throw error;
    }
  }

  // read content
  const fileContent = await readFile(fileName, "utf8");
  const data = JSON.parse(fileContent);

  // add k:v pairs for each day of the month
  for (let i = 1; i <= 31; i++) {
    data[i] = i.toString();
  }

  // write the updated data back to the file
  await writeFile(fileName, JSON.stringify(data, null, 2));
}

const monthStr = "october";
const directoryPath = monthStr.toLowerCase();
const fileName = join(monthStr.toLowerCase(), "dates.json");

function formatter(directoryPath, fileName) {
  const folder = directoryPath.toLowerCase();
  const file = join(folder, `${fileName}.json`);
  return updateFile(folder, file);
}

// updateFile(directoryPath, fileName);
formatter("dogs", "areBest");
export { updateFile };
