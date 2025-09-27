import PathologyTest from "../models/pathologytest.js";

export const getPathologyTests = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: "i" } };
    }
    const tests = await PathologyTest.find(query);
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

