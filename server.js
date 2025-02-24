const express = require("express");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/dbConfig");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

// connect to the database
connectDB();

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/sub_categoryRoutes"));
app.use("/products", require("./routes/productRoutes"));
// app.use("/category-discounts", require("./routes/categoryDiscountRoutes"));

app.listen(process.env.PORT, () => console.log(`Product Service running on port ${process.env.PORT}`));
