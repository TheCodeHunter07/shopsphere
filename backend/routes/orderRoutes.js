const express = require("express");

const {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  payForOrder,   // 👈 add this
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// User routes
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// Payment route (User)
router.put("/:id/pay", protect, payForOrder);

// Admin route - update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;