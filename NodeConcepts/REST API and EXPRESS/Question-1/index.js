
 import express from "express";

const app = express();
const PORT = 3000;

// Routes 
app.get("/home", (req, res) => {
  res.json({ message: "This is home page" });
});

app.get("/contactus", (req, res) => {
  res.json({ message: "Contact us at contact@contact.com" });
});

// Bonus Route 
app.get("/about", (req, res) => {
  res.json({ message: "Welcome to the About page!" });
});

// Server Start 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
