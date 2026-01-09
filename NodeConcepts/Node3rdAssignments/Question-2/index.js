import boxen from "boxen";

const message = "I am using my first external module!";
const title = "Hurray!!!";
const name = "suhani";
// find the name double box 
console.log(
  boxen(name, {
    title: title,
    titleAlignment: "left",
    borderColor: "red",
    borderStyle: "singleDouble",
  })
);
// Classic (default) box
console.log(
  boxen(message, {
    title: title,
    titleAlignment: "center",
  })
);

// SingleDouble style box
console.log(
  boxen(message, {
    title: title,
    titleAlignment: "center",
    borderStyle: "singleDouble",
  })
);

// Round style box
console.log(
  boxen(message, {
    title: title,
    titleAlignment: "center",
    borderStyle: "round",
  })
);
