const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const { vendor_id, category_id, sub_category_id, name, brand, description, cover_image, sub_image, likes, stock } = req.body;
        const product = await Product.create({ vendor_id, category_id, sub_category_id, name, brand, description, cover_image, sub_image, likes, stock });
        res.status(201).json({
            success: true,
            message: "New Product is added successfully"
        });
    } catch (error) {
        console.error('Error in creating a new product', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.findAll();
        return res.status(200).json({
            success: true,
            products
        });
    }catch(error){
        console.error('Error in returning all products', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

exports.getAllProductsByCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const products = await Product.findAll({ where: { category_id: id}});
        return res.status(200).json({
            success: true,
            products
        });
    }catch(error){
        console.error('Error in returning all products by ctaegory', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

exports.getAllProductsBySubCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const products = await Product.findAll({ where: { sub_category_id: id}});
        return res.status(200).json({
            success: true,
            products
        });
    }catch(error){
        console.error('Error in returning all products by sub-category', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

exports.getAllProductsOfVendor = async (req, res) => {
    try{
        const { id } = req.params;
        const products = await Product.findAll({ where: { vendor_id: id}});
        return res.status(200).json({
            success: true,
            products
        });
    }catch(error){
        console.error('Error in returning all products of vendor', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

exports.updateProductStatus = async (req, res) => {
    try{
        const { id, status } = req.body;
        const updatedProduct = await Product.update({ status: status}, { where: { product_id: id }});
        return res.status(200).json({
            success: true,
            updatedProduct
        });
    }catch(error){
        console.error('Error in updating product status', error.message);
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};

// exports.updateProductStock = async(req, res) => {

// };