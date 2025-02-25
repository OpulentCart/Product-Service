const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateUser, authorizeRole} = require('../middleware/authMiddleware');

router.post('/create', productController.createProduct);
router.get('/admin', productController.getAllProducts);
router.get('/category/:id', productController.getAllProductsByCategory);
router.get('/sub_category/:id', productController.getAllProductsBySubCategory);
router.put('/:id', productController.updateProductStatus);
router.get('/:id', productController.getAllProductsOfVendor);
router.get('/customer/products', authenticateUser , authorizeRole('customer'), productController.getAllProductsForCustomer);
router.get('/count/products', authenticateUser, authorizeRole('admin'), productController.getTotalProductsCount);

module.exports = router;