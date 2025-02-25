const Category = require("../models/category");

exports.createCategory = async (req, res) => {
    try{
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json({
            success: true,
            message: "New category is created successfully"
        });
    }catch(error){
        console.log("Error in creating a new Category: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failure in creting a category"
        });
    }
};

exports.getCategories = async (req, res) => {
    try{
        const categories = await Category.findAll();
        return res.status(200).json({
            success: true,
            categories
        });
    }catch(error){
        console.error("Error in fetching all categories: ". error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.updateCategory = async(req, res) => {
    try{
        const { name } = req.body;
        const { id } = req.params;
        await Category.update({ name: name}, {where: {category_id: id}}); 
        return res.status(201).json({
            success: true,
            message: "Updates are applied"
        });
    }catch(error){
        console.error("Error in updaing category", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.deleteCategory = async(req, res) => {
    try{
        const { id } = req.params;
        await Category.destroy({ category_id: id});
        return res.status(201).json({
            success: true,
            message: "Category deleted successfully"
        });
    }catch(error){
        console.error("Error in deleting Category", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getTotalCategoryCount = async (req, res) => {
    try{
        const totalCategory = await Category.count();
        return res.status(200).json({
            success: true,
            totalCategory
        });
    }catch(error){
        console.error("Error in getting count of Categories", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get total count of Categories"
        });
    }
};