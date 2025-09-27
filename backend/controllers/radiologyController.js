import RadiologyTest from "../models/RadiologyTest.js";

export const getRadiologyTests = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }
    const tests = await RadiologyTest.find(query);
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
