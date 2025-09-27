import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  testType: String, // pathology / radiology
  testId: String,
  slot: String,
  bookingDate: { type: Date, default: Date.now }
});

export default mongoose.model("booking", bookingSchema);
