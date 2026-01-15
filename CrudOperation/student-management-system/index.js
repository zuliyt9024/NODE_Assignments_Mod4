

import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Helper function to read data
const readData = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

// Helper function to write data
const writeData = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

// ✅ GET /students - Fetch all students
app.get("/students", (req, res) => {
  const data = readData();
  res.status(200).json(data.students);
});

// ✅ POST /students - Add new student
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = readData();

  const newStudent = {
    id: Date.now(),
    name,
    course,
    year
  };

  data.students.push(newStudent);
  writeData(data);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// ✅ PUT /students - Update student by id
app.put("/students", (req, res) => {
  const { id, name, course, year } = req.body;
  const data = readData();

  const studentIndex = data.students.findIndex(
    (stu) => stu.id === Number(id)
  );

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (name) data.students[studentIndex].name = name;
  if (course) data.students[studentIndex].course = course;
  if (year) data.students[studentIndex].year = year;

  writeData(data);

  res.status(200).json({
    message: "Student updated successfully",
    student: data.students[studentIndex]
  });
});

// ✅ DELETE /students/:id - Delete student by id
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();

  const filteredStudents = data.students.filter(
    (stu) => stu.id !== Number(id)
  );

  if (filteredStudents.length === data.students.length) {
    return res.status(404).json({ message: "Student not found" });
  }

  data.students = filteredStudents;
  writeData(data);

  res.status(200).json({ message: "Student deleted successfully" });
});

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
