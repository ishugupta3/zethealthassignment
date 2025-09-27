import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import medicineRoutes from "./routes/medicineRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import pathologyRoutes from "./routes/pathologyRoutes.js";
import radiologyRoutes from "./routes/radiologyRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" DB Connected"))
  .catch(err => console.log("DB Error:", err));

app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tests/pathology", pathologyRoutes);
app.use("/api/tests/radiology", radiologyRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
