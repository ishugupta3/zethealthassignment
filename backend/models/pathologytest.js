import mongoose from "mongoose";

const pathologySchema = new mongoose.Schema({
  name: String,
  price: Number,
  sampleType: String,
  resultTime: String
});

export default mongoose.model("pathologyTest", pathologySchema);
