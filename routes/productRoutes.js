const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/create', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/category/:id', productController.getAllProductsByCategory);
router.get('/sub_category/:id', productController.getAllProductsBySubCategory);
router.put('/:id', productController.updateProductStatus);
router.get('/:id', productController.getAllProductsOfVendor);