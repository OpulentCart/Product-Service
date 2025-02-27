const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/sub_categoryController");
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');

router.post("/create", subCategoryController.createSubCategory);
router.get("/", authenticateUser, subCategoryController.getSubCategories);
router.put("/:id", authenticateUser, authorizeRole('admin'), subCategoryController.updateSubCategory);
router.delete("/:id", authenticateUser, authorizeRole('admin'), subCategoryController.deleteSubCategory);
router.get("/count/subcategories", authenticateUser, authorizeRole('admin'), subCategoryController.getTotalSubCategoriesCount);

module.exports = router;
