const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} = require("../controllers/productControllers");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
  });

router
  .route("/")
  .get(limiter, getProducts)
  .post(limiter, createProduct);
router
  .route("/:id")
  .get(limiter, getProductById)
  .delete(limiter, deleteProduct)
  .put(limiter, updateProduct);

module.exports = router;
 