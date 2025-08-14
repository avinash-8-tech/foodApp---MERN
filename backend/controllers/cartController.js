import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};

        const { itemId } = req.body;

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};

        const { itemId } = req.body;

        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export {addToCart, removeFromCart, getCart}