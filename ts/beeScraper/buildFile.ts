import { readFile, writeFile, access, stat, mkdir } from "fs/promises";
import { join } from "path";

async function writeDataToFile(folder, file, dataToWrite) {
  // create nonextistent directories
  try {
    await stat(folder);
  } catch (error) {
    if (error.code === "ENOENT") {
      await mkdir(folder, { recursive: true });
    } else {
      console.log("there was an error while writing to the folder.");

      throw error;
    }
  }

  // create a file that doesn't exist
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

  // write updates to the file
  Object.assign(data, dataToWrite);
  await writeFile(file, JSON.stringify(data, null, 2));
}

// TODO: type
type dataProps = any;
async function buildFile(folder: string, file: string, data: dataProps) {
  const directory = folder.toLowerCase();
  const fileName = join(directory, `${file}.json`);

  return await writeDataToFile(directory, fileName, data);
}

export default buildFile;

const dogObject = {
  id: 1,
  name: "Journey",
  type: "dog",
};

buildFile("buildFile", "dog", dogObject);
