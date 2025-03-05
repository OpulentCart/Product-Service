const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateUser, authorizeRole} = require('../middleware/authMiddleware');

router.post('/create', authenticateUser, authorizeRole('vendor'), productController.createProduct);
router.get('/admin/products', authenticateUser, authorizeRole("admin"), productController.getAllProducts);
router.get('/category/:id', productController.getAllProductsByCategory);
router.get('/sub_category/:id', productController.getAllProductsBySubCategory);
router.put('/:id', authenticateUser, authorizeRole('admin'), productController.updateProductStatus);
router.get('/vendor/', authenticateUser, authorizeRole('vendor'), productController.getAllProductsOfVendor);
router.get('/customer/products', productController.getAllProductsForCustomer);
router.get('/count/products', authenticateUser, authorizeRole('admin'), productController.getTotalProductsCount);
router.get('/:id', authenticateUser, productController.getProductById);
router.get('/customers/category/:id', productController.getAllProductsByCategoryForCustomers);
router.get('/customers/sub_category/:id', productController.getAllProductsBySubCategoryForCustomers);
router.delete('/:id', authenticateUser, authorizeRole('vendor'), productController.deleteProduct);
router.get('/search/:keyword', productController.searchProducts);

module.exports = router;