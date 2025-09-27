import RadiologyTest from "../models/RadiologyTest.js";

export const getRadiologyTests = async (req, res) => {
  try {
    const tests = await RadiologyTest.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
