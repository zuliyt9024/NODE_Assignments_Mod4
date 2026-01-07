

// ES Modules


import os from "os";
import { writeFile, readFile, appendFile, unlink } from "fs";


console.log("Free Memory:", os.freemem());
console.log("Total CPU Cores:", os.cpus().length);



// 1. Create data.txt
writeFile("data.txt", "Hello World\n", (err) => {
  if (err) {
    console.error("Error creating data.txt:", err.message);
    return;
  }
  console.log("data.txt created");

  // 2. Create Readme.md
  writeFile("Readme.md", "## This is first line in Readme\n", (err) => {
    if (err) {
      console.error("Error creating Readme.md:", err.message);
      return;
    }
    console.log("Readme.md created");

    // 3. Read data.txt
    readFile("data.txt", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading data.txt:", err.message);
        return;
      }
      console.log("Content of data.txt:");
      console.log(data);

      // 4. Append second line
      appendFile("data.txt", "This is second line\n", (err) => {
        if (err) {
          console.error("Error appending:", err.message);
          return;
        }
        console.log("Text appended");

        // 5. Delete Readme.md
        unlink("Readme.md", (err) => {
          if (err) {
            console.error("Error deleting Readme.md:", err.message);
            return;
          }
          console.log("Readme.md deleted");
        });
      });
    });
  });
});


