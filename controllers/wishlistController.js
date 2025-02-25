const Product = require('../models/product');
const Wishlist = require('../models/wishlist');

// get wishlist of the customer
exports.getWishlist = async(req, res) => {
    try{
        const user_id = req.user.user_id;
        const wishlist = await Wishlist.findAll({
            where: { user_id },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['main_image', 'name', 'price']
                }
            ]
        });
        return res.status(200).json({
            success: true,
            data: wishlist
        });
    }catch(error){
        console.error("Error in getting wishList: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get your wishlist"
        });
    }
};

// add product to the wish-list
exports.addToWishlist = async(req, res) => {
    try{
        const user_id = req.user.user_id;
        const { product_id } = req.body;
        // Check if product already exists in the wishlist
        const existingItem = await Wishlist.findOne({ where: { user_id, product_id } });
        if (existingItem) {
            return res.status(400).json({ success: false, message: "Product already in wishlist" });
        }
        
        // Add to wishlist
        const wishlistItem = await Wishlist.create({ user_id, product_id });

        return res.status(201).json({ success: true, data: wishlistItem });
    
    }catch(error){
        console.error('Error in adding product to wish-list: ', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to add-product in to the wishlist'
        });
    }
};