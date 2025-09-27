import Medicine from "../models/medicine.js";

export const getMedicines = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }
    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
