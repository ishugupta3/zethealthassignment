import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  medicines: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: "medicine", required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  totalPrice: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  orderDate: { type: Date, default: Date.now }
});

export default mongoose.model("order", orderSchema);
