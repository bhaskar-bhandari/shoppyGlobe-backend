const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cartController.addToCart);
router.put('/:id', authMiddleware, cartController.updateCartItem);
router.delete('/:id', authMiddleware, cartController.removeCartItem);

module.exports = router;
