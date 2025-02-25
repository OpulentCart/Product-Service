const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');

router.post("/create", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/count/categories", authenticateUser, authorizeRole('admin'), categoryController.getTotalCategoryCount);

module.exports = router;
