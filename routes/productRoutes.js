const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// POST route for adding a new product
router.post('/', productController.addProduct);

router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);



module.exports = router;
