const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const { vendor_id, category_id, sub_category_id, name, brand, description, likes, stock } = req.body;
         // Check if files are present
         console.log("Files Received: ", req.files);

         if (!req.files || !req.files.main_image) {
            return res.status(400).json({ 
                success: false, 
                message: "Main image is required" 
            });
        }

        // Upload main image to Cloudinary
        const mainImageResult = await uploadToCloudinary(req.files.main_image.data, "products");
        const main_image_url = mainImageResult.secure_url;
        
        // Upload cover images if provided
        let cover_images_urls = [];
        if (req.files.cover_images) {
            const coverImageFiles = Array.isArray(req.files.cover_images) ? req.files.cover_images : [req.files.cover_images];

            const uploadPromises = coverImageFiles.map(imageFile =>
                uploadToCloudinary(imageFile.data, "products")
            );

            const uploadedImages = await Promise.all(uploadPromises);
            cover_images_urls = uploadedImages.map(img => img.secure_url);
        }

        const product = await Product.create({ 
            vendor_id, 
            category_id, 
            sub_category_id, 
            name, 
            brand, 
            description, 
            main_image: main_image_url,
            cover_images: cover_images_urls, 
            likes, 
            stock });
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

exports.getTotalProductsCount = async (req, res) => {
    try{
        const countProducts = await Product.count();
        return res.status(200).json({
            success: true,
            total_products: countProducts
        });
    }catch(error){
        console.error("Error in counting the number of products", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed in counting the total Products"
        });
    }
};

exports.getVendorIdByProductId = async (req, res) => {
    try{
        const { product_id } = req.body;
        const vendor_id = await Product.findOne()

    }catch(error){
        console.error("Error in returning Vendor id by product id", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve vendor id by project id"
        });
    }
};

exports.getAllProductsForCustomer = async (req, res) => {
    try{
        const products = await Product.findAll({ where: {status: 'approved'}});
        return res.status(200).json({
            success: true,
            products
        });
    }catch(error){
        console.error("Error in getting all products for the customers", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get all Products for customers"
        });
    }
};

// get product details by product id
exports.getProductById = async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findOne({ where: { product_id: id }});
        return res.status(200).json({
            success: true,
            product
        }); 
    }catch(error){
        console.error("Error in getting product details by product id", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get Product Details by product id"
        });
    }
};
// exports.updateProductStock = async(req, res) => {

// };