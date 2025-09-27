import PathologyTest from "../models/pathologytest.js";

export const getPathologyTests = async (req, res) => {
  try {
    const tests = await PathologyTest.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

