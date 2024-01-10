const express = require('express');
const cors = require("cors")
const { errorHandler } = require("./backend/middleware/errorMiddleware");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/products", require("./backend/routes/productRoutes"));

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
