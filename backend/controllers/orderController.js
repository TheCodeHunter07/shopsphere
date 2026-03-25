const Order = require("../models/Order");
const Product = require("../models/Product");

// Create Order (Atomic - Race Safe)
const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let calculatedTotal = 0;

    for (let item of products) {
      const quantity = Number(item.quantity);

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product,
          stock: { $gte: quantity },
        },
        {
          $inc: { stock: -quantity },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(400).json({
          message: "Not enough stock or product not found",
        });
      }

      calculatedTotal += updatedProduct.price * quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      totalAmount: calculatedTotal,
    });

    res.status(201).json(order);

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product");

    res.json(orders);

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin - Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔥 Prevent shipping if not paid
    if (status === "Shipped" && order.paymentStatus !== "Completed") {
      return res.status(400).json({
        message: "Cannot ship unpaid order",
      });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Payment Simulation
const payForOrder = async (req, res) => {
  try {
    const { paymentMethod } = req.body || {};

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method required",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "Completed") {
      return res.status(400).json({
        message: "Order already paid",
      });
    }

    // Simulate 80% success
    const paymentSuccess = Math.random() < 0.8;

    if (!paymentSuccess) {
      order.paymentStatus = "Failed";
      await order.save();

      return res.status(400).json({
        message: "Payment failed. Please try again.",
      });
    }

    // Success case
    order.paymentStatus = "Completed";
    order.paymentMethod = paymentMethod;
    order.transactionId = "TXN-" + Date.now();
    order.paidAt = new Date();
    order.status = "Paid";

    await order.save();

    res.json({
      message: "Payment successful",
      order,
    });

  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  updateOrderStatus,
  payForOrder,
};