const subCategory = require("../models/sub_category");
const SubCategory = require("../models/sub_category");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, category_id } = req.body;
    const subCategory = await SubCategory.create({ name, category_id });
    return res.status(201).json({
        success: true,
        message: "New sub-category is created successfully"
    });
  } catch (error) {
    console.error("Error in creating subcategory:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll();
    return res.status(200).json({
        success: true,
        subCategories
    });
  } catch (error) {
    console.error("Error in creating subcategory:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.updateSubCategory = async(req, res) => {
    try{
        const { name } = req.body;
        const { id } = req.params;
        await subCategory.update({ name: name}, {where: {sub_category_id: id}}); 
        return res.status(201).json({
            success: true,
            message: "Updates are applied"
        });
    }catch(error){
        console.error("Error in updaing sub-category", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.deleteSubCategory = async(req, res) => {
    try{
        const { id } = req.params;
        await subCategory.destroy({ sub_category_id: id});
        return res.status(201).json({
            success: true,
            message: "Sub-category deleted successfully"
        });
    }catch(error){
        console.error("Error in updaing sub-category", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getTotalSubCategoriesCount = async(req, res) => {
  try{
    const totalSubCategories = await SubCategory.count();
    return res.status(200).json({
      success: true,
      totalSubCategories
    });
  } catch(error){
    console.error("Error in getting total count of sub-categories", error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to get the total count of sub-categories'
    });
  }                             
};
