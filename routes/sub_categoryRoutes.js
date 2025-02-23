const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/sub_categoryController");

router.post("/create", subCategoryController.createSubCategory);
router.get("/", subCategoryController.getSubCategories);

module.exports = router;
