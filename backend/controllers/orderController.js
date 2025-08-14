import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place Order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        console.log("Placing order for userId:", req.userId);

        const newOrder = new orderModel({
            userId: req.userId, // ✅ Token से
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false
        });

        await newOrder.save();

        // cart clear
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        // stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }));

        // delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        });

        // stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log("Error placing order:", error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// verify Order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log("Error verifying order:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// get User Orders
const userOrders = async (req, res) => {
    try {
        console.log("Fetching orders for userId:", req.userId);
        const orders = await orderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        console.log("Orders found:", orders);
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching orders:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// list Orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// text api for update order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };