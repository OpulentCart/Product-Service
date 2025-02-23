const SubCategory = require("../models/sub_category");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, category_id } = req.body;
    const subCategory = await SubCategory.create({ name, category_id });
    res.status(201).json(subCategory);
  } catch (error) {
    console.error("Error in creating subcategory:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
