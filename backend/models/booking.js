import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  testType: String, // pathology / radiology
  testId: String,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  slot: String,
  bookingDate: { type: Date, default: Date.now }
});

export default mongoose.model("booking", bookingSchema);
