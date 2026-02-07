
import express from "express";
import fs from "fs";

const router = express.Router();
const dbPath = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// 1️⃣ Create Order
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "productId and quantity required" });
  }

  const db = readDB();

  const product = db.products.find((p) => p.id === Number(productId));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.stock === 0) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  if (quantity > product.stock) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  // Revenue Formula
  const totalAmount = product.price * quantity;

  // Reduce stock
  product.stock -= quantity;

  const newOrder = {
    id: db.orders.length ? db.orders[db.orders.length - 1].id + 1 : 1,
    productId: Number(productId),
    quantity,
    totalAmount,
    status: "placed",
    createdAt: getTodayDate()
  };

  db.orders.push(newOrder);
  writeDB(db);

  res.status(201).json({ message: "Order placed successfully", order: newOrder });
});

// 2️⃣ Get All Orders
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json({ total: db.orders.length, orders: db.orders });
});

// 3️⃣ Cancel Order (Soft Delete)
router.delete("/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const db = readDB();

  const order = db.orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status === "cancelled") {
    return res.status(400).json({ message: "Order already cancelled" });
  }

  const today = getTodayDate();

  if (order.createdAt !== today) {
    return res.status(400).json({
      message: "Cancellation allowed only on the same day"
    });
  }

  const product = db.products.find((p) => p.id === order.productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found for this order" });
  }

  // Revert stock
  product.stock += order.quantity;

  // Soft delete
  order.status = "cancelled";

  writeDB(db);

  res.status(200).json({ message: "Order cancelled successfully", order });
});

// 4️⃣ Change Order Status
router.patch("/change-status/:orderId", (req, res) => {
  const orderId = Number(req.params.orderId);
  const { status } = req.body;

  const validFlow = ["placed", "shipped", "delivered"];

  if (!status || !validFlow.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const db = readDB();
  const order = db.orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status === "cancelled") {
    return res.status(400).json({ message: "Cancelled order cannot be updated" });
  }

  if (order.status === "delivered") {
    return res.status(400).json({ message: "Delivered order cannot be updated" });
  }

  const currentIndex = validFlow.indexOf(order.status);
  const newIndex = validFlow.indexOf(status);

  if (newIndex !== currentIndex + 1) {
    return res.status(400).json({ message: "Cannot skip order status flow" });
  }

  order.status = status;
  writeDB(db);

  res.status(200).json({ message: "Order status updated", order });
});

export default router;
