import { readFile, writeFile, access, stat, mkdir } from "fs/promises";

async function makeMonthFile(directory, fileName) {
  // check if directory exists
  try {
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
  for (let i = 1; i <= 30; i++) {
    data[i] = i.toString();
  }

  // write the updated data back to the file
  await writeFile(fileName, JSON.stringify(data, null, 2));
}

const september = "september";
const fileMake = "thisFile";
// makeMonthFile(directoryPath, fileName);
makeMonthFile(september, fileMake);
export { makeMonthFile };
