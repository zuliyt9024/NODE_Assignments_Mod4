
import express from "express";
import fs from "fs";

const router = express.Router();
const dbPath = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));

// 1️⃣ All Orders with Count (map/forEach)
router.get("/allorders", (req, res) => {
  const db = readDB();

  const ordersList = [];
  db.orders.forEach((order) => ordersList.push(order));

  res.status(200).json({
    totalOrders: ordersList.length,
    orders: ordersList
  });
});

// 2️⃣ Cancelled Orders with Count (filter)
router.get("/cancelled-orders", (req, res) => {
  const db = readDB();

  const cancelledOrders = db.orders.filter((o) => o.status === "cancelled");

  res.status(200).json({
    totalCancelledOrders: cancelledOrders.length,
    cancelledOrders
  });
});

// 3️⃣ Shipped Orders with Count (filter)
router.get("/shipped", (req, res) => {
  const db = readDB();

  const shippedOrders = db.orders.filter((o) => o.status === "shipped");

  res.status(200).json({
    totalShippedOrders: shippedOrders.length,
    shippedOrders
  });
});

// 4️⃣ Total Revenue by Product (filter + reduce)
router.get("/total-revenue/:productId", (req, res) => {
  const productId = Number(req.params.productId);
  const db = readDB();

  const product = db.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const productOrders = db.orders.filter(
    (o) => o.productId === productId && o.status !== "cancelled"
  );

  const totalRevenue = productOrders.reduce((sum, order) => {
    return sum + order.quantity * product.price;
  }, 0);

  res.status(200).json({
    productId,
    productName: product.name,
    totalRevenue,
    totalOrders: productOrders.length
  });
});

// 5️⃣ Overall Revenue (filter + reduce)
router.get("/alltotalrevenue", (req, res) => {
  const db = readDB();

  const validOrders = db.orders.filter((o) => o.status !== "cancelled");

  const totalRevenue = validOrders.reduce((sum, order) => {
    const product = db.products.find((p) => p.id === order.productId);
    if (!product) return sum;
    return sum + order.quantity * product.price;
  }, 0);

  res.status(200).json({
    totalOrders: validOrders.length,
    totalRevenue
  });
});

export default router;
