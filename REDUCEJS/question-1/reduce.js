
const students = [
  { id: 1, name: "Aarav", marks: 85, subject: "Math", passed: true },
  { id: 2, name: "Diya", marks: 72, subject: "Science", passed: true },
  { id: 3, name: "Rohan", marks: 48, subject: "Math", passed: false },
  { id: 4, name: "Sneha", marks: 91, subject: "English", passed: true },
  { id: 5, name: "Karan", marks: 66, subject: "Science", passed: true },
  { id: 6, name: "Meera", marks: 39, subject: "Math", passed: false }
];

const totalMarks = students.reduce((sum, student) => sum + student.marks, 0);

const result = students.reduce(
  (acc, student) => {
    if (student.passed) acc.passed++;
    else acc.failed++;
    return acc;
  },
  { passed: 0, failed: 0 }
);

console.log("Total Marks:", totalMarks);
console.log("Passed/Failed Count:", result);
