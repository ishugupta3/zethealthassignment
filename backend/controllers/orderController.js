import Order from "../models/order.js";

export const placeOrder = async (req, res) => {
  try {
    const { medicines, totalPrice } = req.body;
    const newOrder = new Order({ medicines, totalPrice });
    const savedOrder = await newOrder.save();
    res.status(201).json({ orderId: savedOrder._id, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
