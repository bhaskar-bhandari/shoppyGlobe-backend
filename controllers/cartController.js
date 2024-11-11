const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  // Check if product exists, then add it to the user's cart
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Assuming you have user information from JWT authentication

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already has a cart, if not, create one
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex >= 0) {
      // Update quantity if product already exists in cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add product to cart' });
  }
};

exports.updateCartItem = async (req, res) => {
  // Check if cart item exists, then update its quantity
  try {
    const { productId } = req.params; // Product ID from the route parameter
    const { quantity } = req.body; // New quantity from request body
    const userId = req.user.id; // User ID from authenticated user

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    // Find user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      // If the item is not found in the cart
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Cart item quantity updated successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update cart item quantity' });
  }
};

exports.removeCartItem = async (req, res) => {
  // Remove item from cart based on ID
 
// Remove an item from the cart based on the product ID
exports.removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params; // Product ID from route parameter
    const userId = req.user.id; // User ID from authenticated user

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item index in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      // If the item is not found in the cart
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};

};
