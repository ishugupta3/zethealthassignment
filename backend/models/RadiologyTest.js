import mongoose from "mongoose";

const radiologySchema = new mongoose.Schema({
  name: String,
  price: Number,
  labName: String,
  availableSlots: [String]  // ["10 AM", "2 PM"]
});

export default mongoose.model("RadiologyTest", radiologySchema);
