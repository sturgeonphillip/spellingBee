import { readFile, writeFile, access, stat, mkdir } from "fs/promises";
import { join } from "path";

async function writeDataToFile(folder, file, dataToWrite) {
  // create directory if it doesn't yet exist
  try {
    await stat(folder);
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(folder);
    } else {
      console.log("there was an error while writing to the folder.");
      throw error;
    }
  }

  // create file if it doesn't exist
  try {
    await access(file);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(file, "{}", { flag: "w" });
    } else {
      console.log("there was an error while writing to the file.");
    }
  }

  // read content
  const fileContent = await readFile(file, "utf-8");
  const data = JSON.parse(fileContent);

  // write updated data to the file
  Object.assign(data, dataToWrite);

  await writeFile(file, JSON.stringify(data, null, 2));
}

// utility to specify location and data to write
export async function buildFile(folder, file, dataToWrite) {
  const directory = folder.toLowerCase();
  const fileName = join(directory, `${file}.json`);

  return await writeDataToFile(directory, fileName, dataToWrite);
}
