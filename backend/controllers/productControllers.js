const { getConnection } = require("../util/config");
const {sanityFunction} = require("../util/santityUtil")

// CRUD operations
const createProduct = async (req, res) => {
  const { name, description } = req.body;
  const sName = sanityFunction(name);
  const sDescription = sanityFunction(description);
  if(!sName || !sDescription) {
    console.log("first")
    return res.send("SQL Injecktion found..! ⛔⛔⛔")
  }
  const connection = await getConnection();
  await connection.query(
    "INSERT INTO products (name, description) VALUES (?,?)",
    [sName, sDescription]
  );
  res.json({ message: "Product added successfully" });
};

const getProducts = async (req, res) => {
  const connection = await getConnection();
  try {
    const result = await connection.query("SELECT * FROM products");
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  const connection = await getConnection();
  try {
    const result = await connection.query("SELECT * FROM products WHERE id=?", [
      productId,
    ]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, description } = req.body;
  const sName = sanityFunction(name);
  const sDescription = sanityFunction(description);
  if(!sName || !sDescription) {
    console.log("first")
    return res.send("SQL Injecktion found..! ⛔⛔⛔")
  }
  const connection = await getConnection();
  try {
    await connection.query(
      "UPDATE products SET name=?, description=? WHERE id=?",
      [sName, sDescription, productId]
    );
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const connection = await getConnection();
  try {
    await connection.query("DELETE FROM products WHERE id=?", [productId]);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
