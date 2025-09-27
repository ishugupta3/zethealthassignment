import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Medicine" }],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model("order", orderSchema);
