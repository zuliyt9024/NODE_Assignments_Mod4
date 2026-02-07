
import express from "express";
import fs from "fs";

const router = express.Router();
const dbPath = "./db.json";

// Helper functions
const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Create Product
router.post("/", (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const db = readDB();

  const newProduct = {
    id: db.products.length ? db.products[db.products.length - 1].id + 1 : 1,
    name,
    price,
    stock
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({ message: "Product created", product: newProduct });
});

// Get All Products
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json({ total: db.products.length, products: db.products });
});

export default router;
