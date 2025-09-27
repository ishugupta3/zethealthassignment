import mongoose from "mongoose";
import dotenv from "dotenv";
import Medicine from "./models/medicine.js";
import PathologyTest from "./models/pathologytest.js";
import RadiologyTest from "./models/RadiologyTest.js";
import medicines from "../data/medicines.json" assert { type: "json" };
import pathology from "../data/pathology.json" assert { type: "json" };
import radiology from "../data/radiology.json" assert { type: "json" };

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Medicine.deleteMany();
    await PathologyTest.deleteMany();
    await RadiologyTest.deleteMany();

    await Medicine.insertMany(medicines);
    await PathologyTest.insertMany(pathology);
    await RadiologyTest.insertMany(radiology);

    console.log("Data Imported!");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

importData();
