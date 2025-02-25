const Product = require('../models/product');
const Wishlist = require('../models/wishlist');

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
            wishlist
        });
    }catch(error){
        console.error("Error in getting wishList: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get your wishlist"
        });
    }
};