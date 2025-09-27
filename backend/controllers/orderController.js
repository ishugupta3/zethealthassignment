import Order from "../models/order.js";

export const placeOrder = async (req, res) => {
  try {
    const { medicines, totalPrice, name, phone, address } = req.body;
    const newOrder = new Order({ medicines, totalPrice, name, phone, address });
    const savedOrder = await newOrder.save();
    res.status(201).json({ orderId: savedOrder._id, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('medicines.medicine');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('medicines.medicine');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
