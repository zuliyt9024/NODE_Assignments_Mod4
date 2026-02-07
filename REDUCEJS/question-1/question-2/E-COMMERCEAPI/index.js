
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import productsRouter from "./routes/products.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "db.json");

// Ensure db.json exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ products: [], orders: [] }, null, 2));
}

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/analytics", analyticsRouter);

app.get("/", (req, res) => {
  res.json({ message: "E-commerce Orders & Analytics API Running ✅" });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
