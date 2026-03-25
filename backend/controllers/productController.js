const Product = require("../models/Product");

// Create Product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, stock } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      image,
      category,
      stock,
    });

    res.status(201).json(product);

  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get Products with Pagination
const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    res.json({
      products,
      page,
      pages: Math.ceil(totalProducts / limit),
      totalProducts,
    });

  } catch (error) {
    console.error("Pagination Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProduct, getProducts };