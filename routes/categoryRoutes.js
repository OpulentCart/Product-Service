const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/create", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/", categoryController.updateCategory);
router.delete("/", categoryController.deleteCategory);

module.exports = router;
