
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "Data.txt");

export function readFileData() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject("File not found or cannot be read");
      } else {
        resolve(data);
      }
    });
  });
}
