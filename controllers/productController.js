const Product = require('../models/product');
const SubCategory = require('../models/sub_category');
const ProductStock = require('../models/product_stock');
const uploadToCloudinary = require('../services/cloudinaryService');
const { getChannel } = require("../config/rabbitmqConfig");

const Category = require('../models/category');

exports.createProduct = async (req, res) => {
    try {
        const { vendor_id, sub_category_id, name, brand, description, stock, price} = req.body;
    
         // Check if files are present
        //console.log("Files Received: ", req.files)
         const availability_status = (stock > 0) ? 'in-stock' : 'out-of-stock'; 
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
            sub_category_id, 
            name, 
            brand, 
            price,
            description, 
            main_image: main_image_url,
            cover_images: cover_images_urls,  
            status: 'pending',
        });
        const productStock = await ProductStock.create({
            product_id: product.product_id,
            stock: stock,
            availability_status
        });

        // Send notifications to RabbitMQ
        const channel = getChannel();
        if (channel) {
            const notification = {
                user_id: 27,
                title: `New Product`,
                message: `A new Product has been created and is pending for Approval.`,
            };

            channel.sendToQueue("notifications", Buffer.from(JSON.stringify(notification)), { persistent: true });
            console.log("📨 Sent notification to RabbitMQ:", notification);
        } else {
            console.error("❌ RabbitMQ channel not available");
        }
        
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
        const products = await Product.findOne({ 
            attributes: ["product_id", "name", "brand", "description", "main_image", "cover_images", "price", "is_bestseller" ],
            include: [
                {
                    model: SubCategory,
                    attributes: [],
                    where: { category_id: id }
                }
            ]
        });
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
        const id = req.user.user_id;
        const products = await Product.findAll({ where: { user_id: id}});
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
        const user_id = req.user.user_id;
        const { status } = req.body;
        const { id } = req.params;
        const updatedProduct = await Product.update({ status: status}, { where: { product_id: id }});
        
        if (updatedProduct[0] > 0) {
            // Fetch product details for embedding
            const product = await Product.findOne({ where: { product_id: id } });

            // Send notifications to RabbitMQ
            const channel = getChannel();
            if (channel) {
                const notification = {
                    user_id: user_id,
                    title: `Update: ${product.name}`,
                    message: `Your Product '${product.name}' has been '${product.status}'.`,
                };

                channel.sendToQueue("notifications", Buffer.from(JSON.stringify(notification)), { persistent: true });
                console.log("📨 Sent notification to RabbitMQ:", notification);
            } else {
                console.error("❌ RabbitMQ channel not available");
            }
        }
                
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

exports.getAllProductsByCategoryForCustomers = async (req, res) => {
    try{
        const { id } = req.params;
        const products = await Product.findOne({ 
            where: { status: 'approved' },
            attributes: ["product_id", "name", "brand", "description", "main_image", "cover_images", "price", "is_bestseller" ],
            include: [
                {
                    model: SubCategory,
                    attributes: [],
                    where: { category_id: id }
                }
            ]
        });
        return res.status(200).json({
            success: true,
            products
        }); 
    }catch(error){
        console.error("Error in getting Products by Category for Customers", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get Products by Category for Customers"
        });
    }
};

exports.getAllProductsBySubCategoryForCustomers = async (req, res) => {
    try{
        const { id } = req.params;
        const products = await Product.findOne({ 
            where: { sub_category_id: id, status: 'approved' },
            attributes: ["product_id", "name", "brand", "description", "main_image", "cover_images", "price", "is_bestseller" ],
        });
        return res.status(200).json({
            success: true,
            products
        }); 
    }catch(error){
        console.error("Error in getting Products by sub-category for Customers", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get Products by sub-category for Customers"
        });
    }
};

// exports.updateProductStock = async(req, res) => {

// };