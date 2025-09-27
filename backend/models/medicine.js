import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  brand: String,
  form: String,   // tablet, syrup, injection
  dosage: String,
  price: Number,
  stock: Number,
  description: String,
  image: String,
});

export default mongoose.model("medicine", medicineSchema);
