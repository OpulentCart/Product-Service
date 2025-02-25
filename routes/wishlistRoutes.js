const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticateUser, authorizeRole } = require('../middleware/authMiddleware');

// Get all wishlist items for customer
router.get('/', authenticateUser, authorizeRole('customer'),wishlistController.getWishlist);

// Add Product to wishlist
router.post('/', authenticateUser, authorizeRole('user'), wishlistController.addToWishlist);

// Remove product from the wishlist
router.delete('/:wishlist_id', wishlistController.removeFromWishlist);

module.exports = router;