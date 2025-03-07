const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
const { connectDB } = require("./config/dbConfig");
const { connectRabbitMQ } = require("./config/rabbitmqConfig");
require("dotenv").config();

app.use(fileUpload());
// middleware
app.use(express.json());
app.use(cors());


// connect to the database
connectDB();

// Connect to RabbitMQ
connectRabbitMQ();

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/subcategories", require("./routes/sub_categoryRoutes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/wishlist", require("./routes/wishlistRoutes"));
// app.use("/category-discounts", require("./routes/categoryDiscountRoutes"));

app.listen(process.env.PORT, () => console.log(`Product Service running on port ${process.env.PORT}`));
